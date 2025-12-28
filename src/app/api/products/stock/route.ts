import { NextResponse } from "next/server";
import { Client, Query, TablesDB } from "node-appwrite";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const tablesDB = new TablesDB(client);

    const found = await tablesDB.listRows({
      databaseId: "main",
      tableId: "products",
      queries: [Query.equal("id", id), Query.limit(1)],
    });

    if (!found.rows || found.rows.length === 0) {
      return NextResponse.json({ id, available: 0, stock: 0, reserved: 0 });
    }

    const prod = found.rows[0] as any;
    const stock = Number(prod.stock ?? 0);
    const reserved = Number(prod.reserved ?? 0);
    const available = Math.max(0, stock - reserved);

    return NextResponse.json({ id, available, stock, reserved });
  } catch (err: any) {
    console.error("/api/products/stock error", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
