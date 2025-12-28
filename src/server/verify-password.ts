"use server";

import { Client, Query, TablesDB } from "node-appwrite";

interface Args {
    password: string;
}

export default async function verifyPassword({ password }: Args) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const tablesDB = new TablesDB(client);

    try {
        const result = await tablesDB.listRows({
            databaseId: "main",
            tableId: "password",
            queries: [Query.limit(1)],
        });
        return { valid: password === result.rows[0].password };
    } catch (error) {
        console.error("Failed to verify password:", error);
        throw error;
    }
}
