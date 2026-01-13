"use server";

import { Client, Query, TablesDB } from "node-appwrite";

interface Args {
    page: number;
    limit?: number;
}

export default async function listOrders({ page, limit = 10 }: Args) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const tablesDB = new TablesDB(client);

    try {
        const result = await tablesDB.listRows({
            databaseId: "6962f8520000ac18a060",
            tableId: "orders",
            queries: [Query.limit(limit), Query.offset((page - 1) * limit)],
        });
        return { page, orders: result };
    } catch (error) {
        console.error("Failed to list orders:", error);
        throw error;
    }
}
