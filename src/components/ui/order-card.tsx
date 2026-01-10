import React, { useState } from "react";
import { products } from "@/data/products";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
// server action moved to API route; use fetch in client components

interface OrderItem {
    id: string;
    quantity: number;
    size?: string; // Added size property
}

interface OrderCardProps {
    customerName: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    zipCode: string;
    state: string;
    $id: string;
    items: string;
    status: string;
    $createdAt: Date;
}

export default function OrderCard({
    customerName,
    phone,
    email,
    street,
    city,
    zipCode,
    state,
    $id,
    items,
    status,
    $createdAt,
}: OrderCardProps) {
    const itemsWithDetails = JSON.parse(items).map((item: OrderItem) => {
        const product = products.find((p) => p.id === item.id);
        return {
            ...item,
            name: product?.title || "Unknown Product",
            price: product?.price || 0,
        };
    });

    const subtotal = itemsWithDetails.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 5000;
    const total = subtotal + shipping;

    const [currentStatus, setCurrentStatus] = useState(status);
    const [loading, setLoading] = useState(false);

    async function handleToggleStatus() {
        setLoading(true);
        try {
            const newStatus =
                currentStatus.toLowerCase() === "processing"
                    ? "Processed"
                    : "Processing";
            await fetch("/api/admin/change-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId: $id, status: newStatus }),
            }).then((r) => r.json());
            setCurrentStatus(newStatus);
        } catch {
            // Optionally show error
        }
        setLoading(false);
    }

    return (
        <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow dark:bg-black dark:border-white">
            <Accordion
                type="single"
                collapsible>
                <AccordionItem
                    value="item-1"
                    className="border-none">
                    <AccordionTrigger className="hover:no-underline px-6 py-4">
                        <div className="flex sm:flex-row flex-col justify-between sm:gap-0 gap-2 sm:items-center w-full pr-4">
                            <div className="text-left">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-mono uppercase">
                                    Order #{$id}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                                    {new Date($createdAt).toLocaleDateString(
                                        undefined,
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }
                                    )}{" "}
                                    • {customerName}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                    NGN&nbsp;
                                    {total.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium uppercase font-mono ${
                                        currentStatus.toLowerCase() ===
                                        "processed"
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                                    }`}>
                                    {currentStatus}
                                </span>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                        <div className="space-y-3 mb-6">
                            {itemsWithDetails.map((item) => (
                                <div
                                    key={item.id + (item.size || "")}
                                    className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-none">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-gray-100">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Qty: {item.quantity}
                                            {item.size && (
                                                <> • Size: {item.size}</>
                                            )}{" "}
                                            × NGN&nbsp;
                                            {item.price.toLocaleString(
                                                undefined,
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            )}
                                        </p>
                                    </div>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                        NGN&nbsp;
                                        {(
                                            item.price * item.quantity
                                        ).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 mb-6 pt-4 border-t border-gray-200">
                            <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                                <span>Subtotal</span>
                                <span>
                                    NGN&nbsp;
                                    {subtotal.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                                <span>Shipping</span>
                                <span>
                                    NGN&nbsp;
                                    {shipping.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between text-base font-semibold text-gray-900 dark:text-white border-t border-gray-200 pt-2 mt-2">
                                <span>Total</span>
                                <span>
                                    NGN&nbsp;
                                    {total.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                            <div>
                                <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Customer Info
                                </h4>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    {customerName}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{phone}</p>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{email}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
                                    Delivery Address
                                </h4>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    {street}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    {city}, {state} {zipCode}
                                </p>
                            </div>
                        </div>
                        <div className="pt-6">
                            <Button
                                className={`w-full tracking-widest rounded-none uppercase font-mono py-3 ${
                                    loading
                                        ? "bg-gray-300 text-white"
                                        : currentStatus.toLowerCase() ===
                                          "processing"
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-gray-700 hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-800"
                                }`}
                                onClick={handleToggleStatus}
                                disabled={loading}>
                                {loading
                                    ? "Updating..."
                                    : currentStatus.toLowerCase() ===
                                      "processing"
                                    ? "Mark as Processed"
                                    : "Mark as Processing"}
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
