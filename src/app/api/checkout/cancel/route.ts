import { NextResponse } from "next/server";
 
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const payload = body || {};
  
  
  } catch (err: any) {
    console.error("/api/checkout/cancel error", err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
