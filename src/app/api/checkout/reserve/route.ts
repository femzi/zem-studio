import { NextResponse } from "next/server";
import createReservation from "../../../../server/create-reservation";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const items = typeof body.items === "string" ? body.items : JSON.stringify(body.items || []);
    const holdMinutes = typeof body.holdMinutes === "number" ? body.holdMinutes : 15;

    const res = await createReservation({ items, holdMinutes });
    return NextResponse.json(res);
  } catch (err: any) {
    console.error("/api/checkout/reserve error", err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
