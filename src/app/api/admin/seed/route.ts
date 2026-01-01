import { NextResponse } from "next/server";
import seedProducts from "@/server/seed-products";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const initialStock = typeof body.initialStock === "number" ? body.initialStock : 50;

    const res = await seedProducts({ initialStock });
    return NextResponse.json({ success: true, res });
  } catch (err: any) {
    console.error("/api/admin/seed error", err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
