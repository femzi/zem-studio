import { NextResponse } from "next/server";
import changeOrderStatus from "../../../../server/change-order-status";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const orderId = body.orderId;
    const status = body.status;
    if (!orderId || !status) {
      return NextResponse.json({ success: false, error: "Missing orderId or status" }, { status: 400 });
    }
    const res = await changeOrderStatus({ orderId, status });
    return NextResponse.json(res);
  } catch (err: any) {
    console.error("/api/admin/change-status error", err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
