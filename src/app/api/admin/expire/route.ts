import { NextResponse } from "next/server";
import expireReservations from "../../../../server/expire-reservations";
import verifyPassword from "../../../../server/verify-password";

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const password = typeof body.password === "string" ? body.password : "";

        const verified = await verifyPassword({ password }).catch(() => ({ valid: false }));
        if (!verified || !verified.valid) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const res = await expireReservations();
        return NextResponse.json(res);
    } catch (error) {
        console.error("/api/admin/expire error", error);
        return NextResponse.json({ success: false, message: (error as any)?.message || "Failed" }, { status: 500 });
    }
}
