"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import StockBadge from "./stock-badge";

interface ProductProps {
  id: string;
  image: string; // expects a path string, e.g. "/cap.svg"
  title: string;
  price: string | number;
  alt?: string;
}

function Product({ id, image, title, price, alt }: ProductProps) {
    return (
        <Link href={'/product/' + id} className="group block transform transition-all hover:-translate-y-1">
            <div className="w-full max-w-sm mx-auto">
                {/* Square image container */}
                <div className="aspect-square w-full overflow-hidden rounded-2xl relative bg-gradient-to-tr from-slate-800 to-slate-700 border border-gray-800 shadow-lg">
                    <Image
                        src={image}
                        alt={alt || title}
                        className="w-full h-full object-cover group-hover:opacity-90"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                    />
                </div>

                {/* Product info */}
                <div className="pt-4">
                    <h1 className="text-base uppercase tracking-tight font-semibold text-gray-900 dark:text-white group-hover:underline">
                        {title}
                    </h1>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-400 font-mono">
                        NGN{' '}
                        {typeof price === 'number' ? price.toFixed(2) : price}
                    </p>
                    <div className="mt-2">
                        <StockBadge id={id} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Product;
