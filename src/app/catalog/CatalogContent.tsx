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

    return (
        <section className="w-full bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl sm:text-5xl font-bold font-display text-gray-900 mb-12">Catalog</h2>

                {searchQuery && (
                    <p className="text-sm text-gray-600 mb-6">Showing results for "{searchQuery}" ({filteredProducts.length} products)</p>
                )}

                {filteredProducts.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className="text-gray-500">No products found matching "{searchQuery}"</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <Product
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
