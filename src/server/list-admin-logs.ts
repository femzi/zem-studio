"use server";

import { Client, Query, TablesDB } from "node-appwrite";

interface Args {
    page?: number;
    limit?: number;
}

export default async function listAdminLogs({ page = 1, limit = 20 }: Args = { page: 1, limit: 20 }) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const tablesDB = new TablesDB(client);

    try {
        const offset = (page - 1) * limit;
        const result = await tablesDB.listRows({
            databaseId: "main",
            tableId: "admin_logs",
            queries: [Query.limit(limit), Query.offset(offset)],
        });

        const total = (result as any)?.total ?? 0;
        return { page, logs: result, total, limit };
    } catch (error) {
        console.error("Failed to list admin logs:", error);
        throw error;
    }
}
