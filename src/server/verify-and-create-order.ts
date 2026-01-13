"use server";

import { Client, ID, Query, TablesDB } from "node-appwrite";

interface OrderItem {
    id: string;
    quantity: number;
    size?: string;
}

interface Args {
    customerName: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    items: string; // JSON stringified array of OrderItem
    status?: string;
}

/**
 * Server action that verifies product stock in Appwrite 'products' table,
 * creates the order row in 'orders' and decrements product stock.
 *
 * Requirements: your Appwrite project should have a `products` table in the
 * `6962f8520000ac18a060` database with rows that include a product `id` (matching the
 * product id in the app) and a numeric `stock` field. This action will
 * look up products by their `id` field.
 */
export default async function verifyAndCreateOrder({
    customerName,
    phone,
    email,
    state,
    street,
    city,
    zipCode,
    items,
    status = "Processing",
}: Args) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const tablesDB = new TablesDB(client);

    const parsedItems: OrderItem[] = JSON.parse(items || "[]");

    try {
        // Step 1: verify stock for each item
        const productRowsToUpdate: Array<{ rowId: string; newStock: number }> = [];

        for (const item of parsedItems) {
            // find product row by the product id field
            const found = await tablesDB.listRows({
                databaseId: "6962f8520000ac18a060",
                tableId: "products",
                queries: [Query.equal("id", item.id), Query.limit(1)],
            });

            if (!found.rows || found.rows.length === 0) {
                throw new Error(`Product not found: ${item.id}`);
            }

            const prod = found.rows[0];
            // expect stock to be a number field on the product row
            const currentStock = Number((prod as any).stock ?? 0);

            if (currentStock < item.quantity) {
                return {
                    success: false,
                    message: `Only ${currentStock} left for ${prod.id || item.id}`,
                };
            }

            productRowsToUpdate.push({
                rowId: prod.$id,
                newStock: currentStock - item.quantity,
            });
        }

        // Step 2: create the order row
        const order = await tablesDB.createRow({
            databaseId: "6962f8520000ac18a060",
            tableId: "orders",
            rowId: ID.unique(),
            data: {
                customerName,
                phone,
                email,
                street,
                city,
                state,
                zipCode,
                items,
                status,
            },
        });

        // Step 3: decrement stock for each product (best-effort)
        for (const p of productRowsToUpdate) {
            try {
                await tablesDB.updateRow({
                    databaseId: "6962f8520000ac18a060",
                    tableId: "products",
                    rowId: p.rowId,
                    data: { stock: p.newStock },
                });
            } catch (err) {
                // Log and continue — the order was created; manual reconciliation may be needed
                console.error("Failed to update product stock for row", p.rowId, err);
            }
        }

        return { success: true, order };
    } catch (error) {
        console.error("verifyAndCreateOrder error:", error);
        throw error;
    }
}
