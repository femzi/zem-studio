import React from "react";
import ProductPageClient from "./ProductPageClient";
import { products } from "@/data/products";
import Header from "@/components/ui/header";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const product = products.find((e) => id === e.id);

    if (!product) {
        return (
            <div>
                <Header />
                <div className="px-8 sm:px-16 md:px-32 md:py-12 py-4">Product not found</div>
            </div>
        );
    }

    return <ProductPageClient product={product} />;
}
