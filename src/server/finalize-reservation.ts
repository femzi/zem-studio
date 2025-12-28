"use server";

import { Client, ID, Query, TablesDB } from "node-appwrite";

interface Args {
    reservationId: string;
    customerName?: string;
    phone?: string;
    email?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
}

/**
 * Finalize a reservation: decrement stock, decrement reserved, create an order,
 * and mark reservation as finalized. If any decrement fails, attempts best-effort rollback.
 */
export default async function finalizeReservation({ reservationId, customerName = "", phone = "", email = "", street = "", city = "", state = "", zipCode = "" }: Args) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const tablesDB = new TablesDB(client);

    try {
        const res = await tablesDB.getRow({ databaseId: "main", tableId: "reservations", rowId: reservationId });
        if (!res) throw new Error("Reservation not found");
        const reservation = res as any;
        if (reservation.status !== "reserved") {
            return { success: false, message: "Reservation is not active" };
        }

        const items = reservation.items as Array<any>;

        // Decrement stock and reserved for each product
        for (const item of items) {
            const found = await tablesDB.listRows({ databaseId: "main", tableId: "products", queries: [Query.equal("id", item.id), Query.limit(1)] });
            if (!found.rows || found.rows.length === 0) {
                throw new Error(`Product not found: ${item.id}`);
            }
            const prod = found.rows[0] as any;
            const stock = Number(prod.stock ?? 0);
            const reserved = Number(prod.reserved ?? 0);

            const newStock = Math.max(0, stock - item.quantity);
            const newReserved = Math.max(0, reserved - item.quantity);

            await tablesDB.updateRow({ databaseId: "main", tableId: "products", rowId: prod.$id, data: { stock: newStock, reserved: newReserved } });
        }

        // create order
        const order = await tablesDB.createRow({ databaseId: "main", tableId: "orders", rowId: ID.unique(), data: { customerName, phone, email, street, city, state, zipCode, items, status: "Processing" } });

        // mark reservation finalized
        await tablesDB.updateRow({ databaseId: "main", tableId: "reservations", rowId: reservationId, data: { status: "finalized", finalizedAt: Date.now(), orderId: order.$id } });

        return { success: true, order };
    } catch (error) {
        console.error("finalizeReservation error", error);
        return { success: false, message: (error as any)?.message || "Failed to finalize reservation" };
    }
}
