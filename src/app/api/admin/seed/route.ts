import { NextResponse } from "next/server";
import seedProducts from "../../../../server/seed-products";
import verifyPassword from "../../../../server/verify-password";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const initialStock = typeof body.initialStock === "number" ? body.initialStock : 10;
    const password = typeof body.password === "string" ? body.password : "";

    // verify admin password server-side
    const verified = await verifyPassword({ password }).catch(() => ({ valid: false }));
    if (!verified || !verified.valid) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const res = await seedProducts({ initialStock });
    return NextResponse.json({ success: true, res });
  } catch (err: any) {
    console.error("/api/admin/seed error", err);
    return NextResponse.json({ success: false, error: err.message || String(err) }, { status: 500 });
  }
}
