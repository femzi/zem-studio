"use client";

import Product from "@/components/ui/product";
import { products } from "@/data/products";
import { useSearch } from "@/contexts/SearchContext";
import React from "react";

export default function CatalogContent() {
    const { searchQuery } = useSearch();

    // Filter products based on search query
    const filteredProducts = products.filter(
        (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort filtered products by category
    const sortedProducts = filteredProducts.sort((a, b) =>
        a.category.localeCompare(b.category)
    );

    // Group products by category
    const groupedProducts = sortedProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {} as Record<string, typeof products>);

    return (
        <>
            {searchQuery && (
                <div className="px-8 sm:px-16 md:px-32 py-4">
                    <p className="text-sm text-gray-600">
                        Showing results for &quot;{searchQuery}&quot; (
                        {filteredProducts.length} products)
                    </p>
                </div>
            )}
            {Object.entries(groupedProducts).map(
                ([category, categoryProducts]) => (
                    <div key={category}>
                        <h1 className="uppercase px-8 sm:px-16 md:px-32 py-1 font-semibold font-mono tracking-tight text-lg text-gray-900 dark:text-white">
                            {category}
                        </h1>
                        <div className="grid grid-cols-2 gap-8 sm:gap-16 md:grid-cols-3 px-8 sm:px-16 md:px-32 md:py-12 py-4">
                            {categoryProducts.map((product) => (
                                <Product
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    image={product.image}
                                />
                            ))}
                        </div>
                    </div>
                )
            )}
            {filteredProducts.length === 0 && searchQuery && (
                <div className="px-8 sm:px-16 md:px-32 py-8 text-center h-[80dvh] flex items-center justify-center">
                    <p className="text-gray-500">
                        No products found matching &quot;{searchQuery}&quot;
                    </p>
                </div>
            )}
        </>
    );
}
