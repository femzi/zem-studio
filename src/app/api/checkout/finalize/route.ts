import { NextResponse } from "next/server";
import finalizeReservation from "../../../../server/finalize-reservation";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const payload = body || {};
    const res = await finalizeReservation(payload);
    return NextResponse.json(res);
  } catch (err: any) {
    console.error("/api/checkout/finalize error", err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
