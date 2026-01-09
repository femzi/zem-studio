"use client";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ArrowRightIcon,
    MinusIcon,
    PlusIcon,
    TrashIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const router = useRouter();

    useEffect(() => {
        const loadCart = () => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            setCartItems(cart);
            // initialize selection map
            const sel: Record<string, boolean> = {};
            cart.forEach((item: any) => {
                sel[`${item.id}-${item.size}`] = true;
            });
            setSelected(sel);
        };

        loadCart();

        const handleStorageChange = () => {
            loadCart();
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const updateQuantity = (id: number, size: string, newQuantity: number) => {
        const updatedCart = cartItems
            .map((item) =>
                item.id === id && item.size === size
                    ? { ...item, quantity: newQuantity }
                    : item
            )
            .filter((item) => item.quantity > 0);

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        // update selection map to remove any deselected items if removed
        const key = `${id}-${size}`;
        setSelected((s) => {
            const copy = { ...s };
            if (!updatedCart.find((it) => `${it.id}-${it.size}` === key)) {
                delete copy[key];
            }
            return copy;
        });
        window.dispatchEvent(new Event("storage"));
    };

    const removeItem = (id: number, size: string) => {
        const updatedCart = cartItems.filter(
            (item) => !(item.id === id && item.size === size)
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storage"));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const emptyCart = (
        <>
            <div className="px-8 sm:px-16 h-[80vh] gap-y-4 md:px-32 md:py-12 py-4 flex items-center justify-center flex-col">
                <h1 className="font-bold text-3xl">Your cart</h1>
                <h2 className="text-slate-300">
                    Your cart is currently empty.
                </h2>
                <Link href={"/"}>
                    <Button className="cursor-pointer w-min py-5 bg-amber-500 text-white tracking-widest rounded-none uppercase font-mono">
                        Continue Shopping
                        <ArrowRightIcon weight="bold" />
                    </Button>
                </Link>
            </div>
        </>
    );

    const cartWithItem = (
        <div className="px-8 sm:px-16 md:px-32 py-8 min-h-[80vh]">
            <h1 className="font-bold text-3xl mb-8 text-center">Your cart</h1>

            <Table>
                <TableHeader>
                    <TableRow className="font-mono">
                        <TableHead>
                            <input
                                type="checkbox"
                                checked={
                                    cartItems.length > 0 &&
                                    cartItems.every((it) => selected[`${it.id}-${it.size}`])
                                }
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    const next: Record<string, boolean> = {};
                                    cartItems.forEach((it) => {
                                        next[`${it.id}-${it.size}`] = checked;
                                    });
                                    setSelected(next);
                                }}
                            />
                        </TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cartItems.map((item, index) => (
                        <TableRow key={`${item.id}-${item.size}-${index}`}>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    checked={!!selected[`${item.id}-${item.size}`]}
                                    onChange={(e) =>
                                        setSelected((s) => ({
                                            ...s,
                                            [`${item.id}-${item.size}`]: e.target.checked,
                                        }))
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 relative">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            className="object-cover rounded"
                                            fill
                                        />
                                    </div>
                                    <div>
                                        <span className="font-medium block">
                                            {item.name}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Size: {item.size}
                                        </span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="font-mono">
                                NGN {item.price.toFixed(2)}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                item.size,
                                                item.quantity - 1
                                            )
                                        }
                                        className="h-8 w-8 p-0 rounded-none">
                                        <MinusIcon size={16} />
                                    </Button>
                                    <span className="w-8 text-center font-mono">
                                        {item.quantity}
                                    </span>
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                item.size,
                                                item.quantity + 1
                                            )
                                        }
                                        className="h-8 w-8 p-0 rounded-none">
                                        <PlusIcon size={16} />
                                    </Button>
                                </div>
                            </TableCell>
                            <TableCell className="font-mono">
                                NGN {(item.price * item.quantity).toFixed(2)}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        removeItem(item.id, item.size)
                                    }
                                    className="text-red-500 hover:text-red-700 rounded-none">
                                    <TrashIcon size={16} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-end mt-8">
                <div className="w-80">
                    <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-semibold mb-4">
                            <span>Subtotal:</span>
                            <span className="font-mono">
                                NGN {subtotal.toFixed(2)}
                            </span>
                        </div>
                        <Button
                            className="w-full bg-amber-500 text-white tracking-widest rounded-none uppercase font-mono py-3 hover:bg-white hover:text-black mb-2"
                            onClick={() => {
                                // gather selected items
                                const selectedItems = cartItems.filter((it) =>
                                    selected[`${it.id}-${it.size}`]
                                );
                                localStorage.setItem(
                                    "checkoutItems",
                                    JSON.stringify(selectedItems)
                                );
                                router.push("/checkout");
                            }}>
                            Checkout Selected
                        </Button>
                        <Link href={"/checkout"}>
                            <Button className="w-full bg-amber-500 text-white tracking-widest rounded-none uppercase font-mono py-3 hover:bg-white hover:text-black">
                                Proceed to Checkout (All)
                            </Button>
                        </Link>
                        <Link href={"/"}>
                            <Button
                                variant="outline"
                                className="w-full mt-2 rounded-none uppercase font-mono">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Header />
            {cartItems.length === 0 ? emptyCart : cartWithItem}
            <Footer />
        </>
    );
}
