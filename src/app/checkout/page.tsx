"use client";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ArrowLeftIcon, CreditCardIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { payWithPayStack } from "../lib/utils";
import createOrder from "@/server/create-order";
// server operations are performed via API endpoints
// verifyAndCreateOrder is intentionally unused here; reservation flow is used instead

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        // If user selected specific items in cart, use those for checkout
        const selected = localStorage.getItem("checkoutSelectedItems");
        if (selected) {
            try {
                const parsed = JSON.parse(selected);
                setCartItems(parsed);
                return;
            } catch (e) {
                console.error("Failed to parse checkoutSelectedItems", e);
            }
        }

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(cart);
    }, []);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = 5000; // Fixed shipping cost
    const total = subtotal + shipping;

    // Validation helper
    const validateForm = (): boolean => {
        const fields = {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            state,
            zipCode,
        };

        // Check for empty fields
        for (const [field, value] of Object.entries(fields)) {
            if (!value.trim()) {
                toast.error(`${field.replace(/([A-Z])/g, " $1").trim()} is required.`);
                return false;
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        // Validate phone (basic check for Nigerian numbers)
        const phoneRegex = /^(\+234|0)[0-9]{10}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
            toast.error("Please enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678).");
            return false;
        }

        // Validate postal code
        if (zipCode.length < 5) {
            toast.error("Please enter a valid postal code.");
            return false;
        }

        return true;
    };

     function handlePlaceOrder() {
        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !address.trim() ||
            !city.trim() ||
            !state.trim() ||
            !zipCode.trim()
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }
        // ...place order logic here...
        payWithPayStack(
            total,
            { email, firstName, lastName, tel: phone },
            async () => {
                await createOrder   ({
                    customerName: `${
                        firstName.charAt(0).toUpperCase() + firstName.slice(1)
                    } ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`,
                    phone,
                    email,
                    state: state.charAt(0).toUpperCase() + state.slice(1),
                    street: address.charAt(0).toUpperCase() + address.slice(1),
                    city: city.charAt(0).toUpperCase() + city.slice(1),
                    zipCode,
                    items: JSON.stringify(
                        cartItems.map(({ id, size, quantity }) => {
                            return { id, size, quantity };
                        })
                    ),
                    status: "Processing",
                });
                localStorage.removeItem("cart");
                window.location.href = "/";
                toast.success("Your order has been placed successfully.");
            },
            () => {
                toast.error("Payment was not successful. Please try again.");
            }
        );
    }

    return (
        <>
            <Toaster />
            <Header />
            <div className="px-8 sm:px-16 md:px-32 py-8 min-h-[80vh]">
                <div className="flex items-start gap-4 mb-8 flex-col">
                    <Link href="/cart">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-none">
                            <ArrowLeftIcon size={16} />
                            Back to Cart
                        </Button>
                    </Link>
                    <div className="w-full text-center">
                        <h1 className="font-bold text-3xl">Checkout</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Customer Information & Address */}
                    <div className="space-y-8">
                        {/* Customer Information */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4 font-mono">
                                Customer Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="firstName"
                                        className="uppercase font-mono">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        className="rounded-none"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="lastName"
                                        className="uppercase font-mono">
                                        Last Name
                                    </Label>
                                    <Input
                                        id="lastName"
                                        className="rounded-none"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="uppercase font-mono">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        className="rounded-none"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="phone"
                                        className="uppercase font-mono">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phone"
                                        className="rounded-none"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4 font-mono">
                                Shipping Address
                            </h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="address"
                                        className="uppercase font-mono">
                                        Street Address
                                    </Label>
                                    <Input
                                        id="address"
                                        className="rounded-none"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="city"
                                            className="uppercase font-mono">
                                            City
                                        </Label>
                                        <Input
                                            id="city"
                                            className="rounded-none"
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="state"
                                            className="uppercase font-mono">
                                            State
                                        </Label>
                                        <Select
                                            value={state}
                                            onValueChange={setState}>
                                            <SelectTrigger className="rounded-none font-mono">
                                                <SelectValue placeholder="Select state" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="abia">
                                                    Abia
                                                </SelectItem>
                                                <SelectItem value="adamawa">
                                                    Adamawa
                                                </SelectItem>
                                                <SelectItem value="akwa-ibom">
                                                    Akwa Ibom
                                                </SelectItem>
                                                <SelectItem value="anambra">
                                                    Anambra
                                                </SelectItem>
                                                <SelectItem value="bauchi">
                                                    Bauchi
                                                </SelectItem>
                                                <SelectItem value="bayelsa">
                                                    Bayelsa
                                                </SelectItem>
                                                <SelectItem value="benue">
                                                    Benue
                                                </SelectItem>
                                                <SelectItem value="borno">
                                                    Borno
                                                </SelectItem>
                                                <SelectItem value="cross-river">
                                                    Cross River
                                                </SelectItem>
                                                <SelectItem value="delta">
                                                    Delta
                                                </SelectItem>
                                                <SelectItem value="ebonyi">
                                                    Ebonyi
                                                </SelectItem>
                                                <SelectItem value="edo">
                                                    Edo
                                                </SelectItem>
                                                <SelectItem value="ekiti">
                                                    Ekiti
                                                </SelectItem>
                                                <SelectItem value="enugu">
                                                    Enugu
                                                </SelectItem>
                                                <SelectItem value="gombe">
                                                    Gombe
                                                </SelectItem>
                                                <SelectItem value="imo">
                                                    Imo
                                                </SelectItem>
                                                <SelectItem value="jigawa">
                                                    Jigawa
                                                </SelectItem>
                                                <SelectItem value="kaduna">
                                                    Kaduna
                                                </SelectItem>
                                                <SelectItem value="kano">
                                                    Kano
                                                </SelectItem>
                                                <SelectItem value="katsina">
                                                    Katsina
                                                </SelectItem>
                                                <SelectItem value="kebbi">
                                                    Kebbi
                                                </SelectItem>
                                                <SelectItem value="kogi">
                                                    Kogi
                                                </SelectItem>
                                                <SelectItem value="kwara">
                                                    Kwara
                                                </SelectItem>
                                                <SelectItem value="lagos">
                                                    Lagos
                                                </SelectItem>
                                                <SelectItem value="nasarawa">
                                                    Nasarawa
                                                </SelectItem>
                                                <SelectItem value="niger">
                                                    Niger
                                                </SelectItem>
                                                <SelectItem value="ogun">
                                                    Ogun
                                                </SelectItem>
                                                <SelectItem value="ondo">
                                                    Ondo
                                                </SelectItem>
                                                <SelectItem value="osun">
                                                    Osun
                                                </SelectItem>
                                                <SelectItem value="oyo">
                                                    Oyo
                                                </SelectItem>
                                                <SelectItem value="plateau">
                                                    Plateau
                                                </SelectItem>
                                                <SelectItem value="rivers">
                                                    Rivers
                                                </SelectItem>
                                                <SelectItem value="sokoto">
                                                    Sokoto
                                                </SelectItem>
                                                <SelectItem value="taraba">
                                                    Taraba
                                                </SelectItem>
                                                <SelectItem value="yobe">
                                                    Yobe
                                                </SelectItem>
                                                <SelectItem value="zamfara">
                                                    Zamfara
                                                </SelectItem>
                                                <SelectItem value="fct">
                                                    FCT
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="zipCode"
                                            className="uppercase font-mono">
                                            Postal Code
                                        </Label>
                                        <Input
                                            id="zipCode"
                                            className="rounded-none"
                                            value={zipCode}
                                            onChange={(e) =>
                                                setZipCode(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 font-mono">
                            Order Summary
                        </h2>
                        <div className="border rounded-none p-6 space-y-4">
                            {cartItems.map((item, index) => (
                                <div
                                    key={`${item.id}-${item.size}-${index}`}
                                    className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                                    <div className="w-16 h-16 relative">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            className="object-cover rounded"
                                            fill
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Size: {item.size}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <div className="font-mono">
                                        NGN{" "}
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div className="space-y-2 pt-4">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span className="font-mono">
                                        NGN {subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping:</span>
                                    <span className="font-mono">
                                        NGN {shipping.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                    <span>Total:</span>
                                    <span className="font-mono">
                                        NGN {total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-amber-500 hover:bg-amber-600 text-white tracking-widest rounded-none uppercase font-mono py-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                onClick={handlePlaceOrder}
                                disabled={isProcessing}>
                                <CreditCardIcon
                                    size={20}
                                    className="mr-2"
                                />
                                {isProcessing ? "Processing..." : "Place Order"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
