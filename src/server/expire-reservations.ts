"use server";

import { Client, Query, TablesDB } from "node-appwrite";
import cancelReservation from "./cancel-reservation";
import logAdminAction from "./log-admin-action";

/**
 * Find reservations that have expired (expiresAt in the past) and cancel them.
 */
export default async function expireReservations() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const tablesDB = new TablesDB(client);

    try {
        const now = Date.now();
        // Paginate through reservations with status reserved
        const limit = 100;
        let offset = 0;
        let expiredCount = 0;

        while (true) {
            const res = await tablesDB.listRows({
                databaseId: "6962f8520000ac18a060",
                tableId: "reservations",
                queries: [Query.equal("status", "reserved"), Query.limit(limit), Query.offset(offset)],
            });

            const rows = (res.rows || []) as any[];
            if (rows.length === 0) break;

            for (const row of rows) {
                const expiresAt = Number(row.expiresAt ?? 0);
                if (!expiresAt) continue;
                if (expiresAt < now) {
                    // reuse cancelReservation to release reserved counts
                    await cancelReservation({ reservationId: row.$id });
                    expiredCount++;
                }
            }

            if (rows.length < limit) break;
            offset += rows.length;
        }

        try {
            await logAdminAction({ action: "expire_reservations", details: { expiredCount } });
        } catch (e) {
            console.error("Failed to log expire action", e);
        }

        return { success: true, expired: expiredCount };
    } catch (error) {
        console.error("expireReservations error", error);
        return { success: false, message: (error as any)?.message || "Failed to expire reservations" };
    }
}
