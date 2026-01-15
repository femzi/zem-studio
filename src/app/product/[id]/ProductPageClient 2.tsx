"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/ui/header";
import StockBadge from "@/components/ui/stock-badge";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { ProductT } from "@/data/products";

interface ProductPageClientProps {
    product: ProductT;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
    const [selectedSize, setSelectedSize] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const { id, title, image, price } = product;

    const addToCart = () => {
        if (!selectedSize) {
            toast.error("Please select a size");
            return;
        }

        setIsAdding(true);

        const cartItem = {
            id: id,
            name: title,
            price: price,
            quantity: 1,
            image: image,
            size: selectedSize,
        };

        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItemIndex = existingCart.findIndex(
            (item: any) =>
                String(item.id) === String(cartItem.id) &&
                String(item.size) === String(cartItem.size)
        );

        if (existingItemIndex > -1) {
            toast.error(
                "This item with the selected size is already in your cart"
            );
            setIsAdding(false);
            return;
        } else {
            existingCart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));

        // Dispatch storage event to update header
        window.dispatchEvent(new Event("storage"));

        setTimeout(() => {
            setIsAdding(false);
            toast.success("Item added to cart!");
        }, 500);
    };

    return (
        <div>
            <Header />
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 sm:gap-16 px-8 sm:px-16 md:px-32 md:py-12 py-4">
                <div className="relative aspect-square bg-white rounded-xl overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-col space-y-2 flex">
                    <h1 className="text-3xl tracking-tight uppercase font-semibold text-black dark:text-white">
                        {title}
                    </h1>
                    <h2 className="text-lg font-mono tracking-tight uppercase font-semibold text-gray-700 dark:text-gray-300">
                        NGN {price.toFixed(2)}
                    </h2>
                    <div className="mt-3">
                        <StockBadge inStock={true} />
                    </div>
                    <div className="flex flex-col gap-4 py-8">
                        <div className="space-y-2">
                            <Label
                                className="block uppercase font-mono text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
                                htmlFor="size-select">
                                SIZE
                            </Label>
                            <Select
                                onValueChange={setSelectedSize}
                                value={selectedSize}>
                                <SelectTrigger
                                    id="size-select"
                                    className="w-full font-mono py-5 rounded-none bg-white text-black dark:bg-black dark:text-white">
                                    <SelectValue placeholder="SIZE" />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-black text-black dark:text-white">
                                    <SelectItem value="S">S</SelectItem>
                                    <SelectItem value="M">M</SelectItem>
                                    <SelectItem value="L">L</SelectItem>
                                    <SelectItem value="XL">XL</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Button
                                onClick={addToCart}
                                disabled={isAdding}
                                className="w-full uppercase border font-mono border-white py-5 bg-black text-white rounded-none disabled:opacity-50">
                                {!isAdding && (
                                    <>
                                        <PlusCircleIcon weight="fill" />
                                    </>
                                )}
                                {isAdding ? "Adding..." : "Add to Cart"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
