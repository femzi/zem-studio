"use server";

import { Client, ID, Query, TablesDB } from "node-appwrite";
import { products } from "@/data/products";
import logAdminAction from "./log-admin-action";

interface Args {
    initialStock?: number;
}

/**
 * Seed or update the Appwrite `products` table rows from the local products list.
 * Each product will receive a numeric `stock` field set to `initialStock` unless
 * the row already exists (in which case it's updated).
 *
 * Usage: call this server action from an admin UI or run it server-side.
 */
export default async function seedProducts({ initialStock = 20 }: Args = { initialStock: 20 }) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const tablesDB = new TablesDB(client);

    const results: Array<{ id: string; action: string }> = [];

    for (const p of products) {
        try {
            const found = await tablesDB.listRows({
                databaseId: "main",
                tableId: "products",
                queries: [Query.equal("id", p.id), Query.limit(1)],
            });

            if (found.rows && found.rows.length > 0) {
                const row = found.rows[0];
                await tablesDB.updateRow({
                    databaseId: "main",
                    tableId: "products",
                    rowId: row.$id,
                    data: {
                        id: p.id,
                        title: p.title,
                        price: p.price,
                        image: p.image,
                        category: p.category,
                        stock: initialStock,
                        reserved: 0,
                    },
                });
                results.push({ id: p.id, action: "updated" });
            } else {
                await tablesDB.createRow({
                    databaseId: "main",
                    tableId: "products",
                    rowId: ID.unique(),
                    data: {
                        id: p.id,
                        title: p.title,
                        price: p.price,
                        image: p.image,
                        category: p.category,
                        stock: initialStock,
                        reserved: 0,
                    },
                });
                results.push({ id: p.id, action: "created" });
            }
        } catch (error) {
            console.error("Failed to seed product", p.id, error);
            results.push({ id: p.id, action: "error" });
        }
    }

    try {
        // Log admin action
        await logAdminAction({ action: "seed_products", details: { initialStock, results } });
    } catch (e) {
        console.error("Failed to log seed action", e);
    }

    return { success: true, results };
}
