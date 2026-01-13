"use server";

import { Client, ID, Query, TablesDB } from "node-appwrite";

interface OrderItem {
    id: string;
    quantity: number;
    size?: string;
}

interface Args {
    items: string; // JSON string of OrderItem[]
    holdMinutes?: number; // how long to hold the reservation
}

/**
 * Create a reservation for items. This increments the `reserved` field on product rows
 * and creates a `reservations` row with expiry. If any item cannot be reserved,
 * the function rolls back previously reserved quantities and returns an error.
 */
export default async function createReservation({ items, holdMinutes = 15 }: Args) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const tablesDB = new TablesDB(client);
    const parsed: OrderItem[] = JSON.parse(items || "[]");

    const updatedProducts: Array<{ rowId: string; qty: number }> = [];

    try {
        for (const item of parsed) {
            const found = await tablesDB.listRows({
                databaseId: "6962f8520000ac18a060",
                tableId: "products",
                queries: [Query.equal("id", item.id), Query.limit(1)],
            });

            if (!found.rows || found.rows.length === 0) {
                throw new Error(`Product not found: ${item.id}`);
            }

            const prod = found.rows[0] as any;
            const stock = Number(prod.stock ?? 0);
            const reserved = Number(prod.reserved ?? 0);
            const available = stock - reserved;

            if (available < item.quantity) {
                // rollback previous increments
                for (const u of updatedProducts) {
                    try {
                        const r = await tablesDB.getRow({
                            databaseId: "6962f8520000ac18a060",
                            tableId: "products",
                            rowId: u.rowId,
                        });
                        const curReserved = Number((r as any).reserved ?? 0);
                        await tablesDB.updateRow({
                            databaseId: "6962f8520000ac18a060",
                            tableId: "products",
                            rowId: u.rowId,
                            data: { reserved: Math.max(0, curReserved - u.qty) },
                        });
                    } catch (e) {
                        console.error("Rollback failed for product", u.rowId, e);
                    }
                }

                return { success: false, message: `Only ${available} left for ${item.id}` };
            }

            // increment reserved
            await tablesDB.updateRow({
                databaseId: "6962f8520000ac18a060",
                tableId: "products",
                rowId: prod.$id,
                data: { reserved: reserved + item.quantity },
            });

            updatedProducts.push({ rowId: prod.$id, qty: item.quantity });
        }

        // create reservation row
        const expiresAt = Date.now() + holdMinutes * 60 * 1000;
        const reservation = await tablesDB.createRow({
            databaseId: "6962f8520000ac18a060",
            tableId: "reservations",
            rowId: ID.unique(),
            data: {
                items: parsed,
                expiresAt,
                status: "reserved",
                createdAt: Date.now(),
            },
        });

        return { success: true, reservationId: reservation.$id, expiresAt };
    } catch (error) {
        console.error("createReservation error", error);
        return { success: false, message: (error as any)?.message || "Reservation failed" };
    }
}
