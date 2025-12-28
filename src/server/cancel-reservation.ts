"use server";

import { Client, Query, TablesDB } from "node-appwrite";

interface Args {
    reservationId: string;
}

/**
 * Cancel a reservation: decrement reserved counts and mark reservation cancelled.
 */
export default async function cancelReservation({ reservationId }: Args) {
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
        for (const item of items) {
            const found = await tablesDB.listRows({ databaseId: "main", tableId: "products", queries: [Query.equal("id", item.id), Query.limit(1)] });
            if (!found.rows || found.rows.length === 0) continue;
            const prod = found.rows[0] as any;
            const reserved = Number(prod.reserved ?? 0);
            await tablesDB.updateRow({ databaseId: "main", tableId: "products", rowId: prod.$id, data: { reserved: Math.max(0, reserved - item.quantity) } });
        }

        await tablesDB.updateRow({ databaseId: "main", tableId: "reservations", rowId: reservationId, data: { status: "cancelled", cancelledAt: Date.now() } });

        return { success: true };
    } catch (error) {
        console.error("cancelReservation error", error);
        return { success: false, message: (error as any)?.message || "Failed to cancel reservation" };
    }
}
