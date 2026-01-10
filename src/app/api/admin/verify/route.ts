import { NextResponse } from "next/server";
import verifyPassword from "../../../../server/verify-password";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const password = typeof body.password === "string" ? body.password : "";
    const res = await verifyPassword({ password });
    return NextResponse.json(res);
  } catch (err: any) {
    console.error("/api/admin/verify error", err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
