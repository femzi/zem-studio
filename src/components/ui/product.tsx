"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductProps {
  id: string;
  image: string; // expects a path string, e.g. "/cap.svg"
  title: string;
  price: string | number;
  alt?: string;
}

function Product({ id, image, title, price, alt }: ProductProps) {
    return (
        <Link href={'/product/' + id} className="group block">
            <div className="w-full">
                {/* Image container */}
                <div className="aspect-square w-full overflow-hidden relative bg-gray-100">
                    <Image
                        src={image}
                        alt={alt || title}
                        className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-200"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                    />
                </div>

                {/* Product info */}
                <div className="pt-4 space-y-2">
                    <h3 className="text-base font-medium text-gray-900 group-hover:underline">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600">
                        NGN {typeof price === 'number' ? price.toFixed(2) : price}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default Product;
