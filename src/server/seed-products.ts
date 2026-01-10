"use server";

import { Client, ID, TablesDB } from "node-appwrite";
import { products } from "@/data/products";

interface Args {
  initialStock?: number;
}

export default async function seedProducts({ initialStock = 20 }: Args = {}) {
  // If Appwrite is not configured, just return a fake success for local/dev.
  if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || !process.env.APPWRITE_API_KEY) {
    return { success: true, seeded: products.length };
  }

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const tablesDB = new TablesDB(client);

  try {
    const created: any[] = [];
    for (const p of products) {
      const row = await tablesDB.createRow({
        databaseId: "main",
        tableId: "products",
        rowId: ID.unique(),
        data: {
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          category: p.category,
          stock: initialStock,
          reserved: 0,
        },
      });
      created.push(row);
    }
    return { success: true, seeded: created.length };
  } catch (error) {
    console.error("seedProducts error", error);
    return { success: false, error: (error as any)?.message || String(error) };
  }
}
