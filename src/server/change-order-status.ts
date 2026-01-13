"use server";

import { Client, TablesDB } from "node-appwrite";

interface Args {
    orderId: string;
    status: string;
}

export default async function changeOrderStatus({ orderId, status }: Args) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const tablesDB = new TablesDB(client);

    try {
        const result = await tablesDB.updateRow({
            databaseId: "6962f8520000ac18a060",
            tableId: "orders",
            rowId: orderId,
            data: { status },
        });
        return result;
    } catch (error) {
        console.error("Failed to update order status:", error);
        throw error;
    }
}
