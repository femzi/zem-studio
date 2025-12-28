"use server";

import { Client, ID, TablesDB } from "node-appwrite";

interface Args {
    action: string;
    details?: any;
}

/**
 * Log an admin action into an `admin_logs` table for auditing.
 * Table schema (recommended):
 * - action (string)
 * - details (object / json)
 * - createdAt (number)
 */
export default async function logAdminAction({ action, details }: Args) {
    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
            .setKey(process.env.APPWRITE_API_KEY);

        const tablesDB = new TablesDB(client);

        await tablesDB.createRow({
            databaseId: "main",
            tableId: "admin_logs",
            rowId: ID.unique(),
            data: {
                action,
                details: typeof details === "string" ? details : JSON.stringify(details ?? {}),
                createdAt: Date.now(),
            },
        });

        return { success: true };
    } catch (error) {
        console.error("logAdminAction error", error);
        return { success: false, message: (error as any)?.message || "Failed to log" };
    }
}
