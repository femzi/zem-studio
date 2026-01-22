import { NextResponse } from "next/server";
 

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "20");
 
  } catch (err: any) {
    console.error("/api/admin/logs GET error", err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const page = typeof body.page === "number" ? body.page : 1;
    const limit = typeof body.limit === "number" ? body.limit : 20;
 
  } catch (err: any) {
    console.error("/api/admin/logs POST error", err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
