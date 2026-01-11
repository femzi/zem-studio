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
                <div className="aspect-square w-full overflow-hidden relative bg-gray-100 border border-gray-200">
                    <Image
                        src={image}
                        alt={alt || title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        priority={false}
                    />
                </div>

                {/* Product info */}
                <div className="pt-5 space-y-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-gray-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm font-semibold text-gray-900">
                        ₦{typeof price === 'number' ? price.toLocaleString() : price}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default Product;
