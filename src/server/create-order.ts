"use server";

import { Client, ID, TablesDB } from "node-appwrite";

interface Args {
    customerName: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    items: string;
    status: string;
}

export default async function createOrder({
    customerName,
    phone,
    email,
    state,
    status,
    street,
    city,
    zipCode,
    items,
}: Args) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const tablesDB = new TablesDB(client);

    try {
        const result = await tablesDB.createRow({
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
        return result;
    } catch (error) {
        console.error("Failed to create order:", error);
        throw error;
    }
}
