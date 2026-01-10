"use client";

import Header from "@/components/ui/header";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import OrderCard from "@/components/ui/order-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon, XIcon, LockKeyIcon } from "@phosphor-icons/react";
// Server operations are executed via API endpoints
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [seeding, setSeeding] = useState(false);
    const [initialStock, setInitialStock] = useState<number>(10);
    const [expiring, setExpiring] = useState(false);
    const [seedSheetOpen, setSeedSheetOpen] = useState(false);
    const [expireSheetOpen, setExpireSheetOpen] = useState(false);
    const [seedPassword, setSeedPassword] = useState("");
    const [expirePassword, setExpirePassword] = useState("");

    useEffect(() => {
        if (!isAuthenticated) return;
        setLoading(true);
        fetch(`/api/admin/orders?page=${page}`)
            .then((r) => r.json())
            .then((res) => {
                setOrders(res.orders?.rows || []);
            })
            .catch(() => setOrders([]))
            .finally(() => setLoading(false));
    }, [page, isAuthenticated]);

    async function handlePasswordSubmit(e: React.FormEvent) {
        e.preventDefault();
        setAuthLoading(true);
        setError("");

        try {
            const result = await fetch("/api/admin/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            }).then((r) => r.json());
            if (result?.valid) {
                setIsAuthenticated(true);
            } else {
                setError("Invalid password. Please try again.");
                setPassword("");
            }
        } catch {
            setError("Failed to verify password. Please try again.");
            setPassword("");
        } finally {
            setAuthLoading(false);
        }
    }

    if (!isAuthenticated) {
        return (
            <div>
                <Header />
                <div className="px-4 sm:px-12 lg:px-24 py-8 min-h-[80vh] flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
                                <LockKeyIcon
                                    size={32}
                                    className="text-white"
                                />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">
                                Admin Access
                            </h1>
                            <p className="text-gray-700 dark:text-gray-400">
                                Enter password to continue
                            </p>
                        </div>
                        <form
                            onSubmit={handlePasswordSubmit}
                            className="space-y-4">
                            <div>
                                <Input
                                    type="password"
                                    placeholder="Enter admin password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                    className="w-full rounded-none h-12 font-mono"
                                    autoFocus
                                    disabled={authLoading}
                                />
                                {error && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {error}
                                    </p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                disabled={authLoading}
                                className="w-full bg-amber-500 hover:bg-amber-600 text-white tracking-widest rounded-none uppercase font-mono py-3 h-12">
                                <LockKeyIcon
                                    size={20}
                                    className="mr-2"
                                />
                                {authLoading
                                    ? "Verifying..."
                                    : "Access Admin Panel"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    const filteredOrders = orders.filter(
        (order) =>
            order.orderNumber
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            order.customerName
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            order.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort orders so "Processing" is at the top
    const sortedOrders = filteredOrders.slice().sort((a, b) => {
        const aProcessing = a.status.toLowerCase() === "processing" ? 1 : 0;
        const bProcessing = b.status.toLowerCase() === "processing" ? 1 : 0;
        return bProcessing - aProcessing;
    });

    return (
        <div>
            <Header />
            <div className="px-4 sm:px-12 lg:px-24 py-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h1 className="text-3xl font-bold">Orders</h1>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                min={0}
                                value={String(initialStock)}
                                onChange={(e) => setInitialStock(Number(e.target.value || 0))}
                                className="w-24 rounded-none h-10 p-2 text-center"
                                aria-label="Initial stock"
                            />
                            <Button
                                onClick={() => setSeedSheetOpen(true)}
                                disabled={seeding}
                                className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-none px-4 py-2">
                                {seeding ? "Seeding..." : `Seed (${initialStock})`}
                            </Button>
                        </div>

                        <Button
                            onClick={() => setExpireSheetOpen(true)}
                            disabled={expiring}
                            className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-none px-4 py-2">
                            {expiring ? "Expiring..." : "Expire Reservations"}
                        </Button>
                    </div>
                    <div className="w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400">
                                <MagnifyingGlassIcon className="h-5 w-5" />
                            </span>
                            <Input
                                type="text"
                                placeholder="Search orders..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-4xl h-10 font-mono p-4 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 transition"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                                    onClick={() => setSearchQuery("")}
                                    aria-label="Clear search">
                                    <XIcon className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                            Loading orders...
                        </p>
                    ) : sortedOrders.length > 0 ? (
                        sortedOrders.map((order) => (
                            <OrderCard
                                key={order.orderNumber || order.$id}
                                {...order}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">
                            No orders found matching your search.
                        </p>
                    )}
                </div>
                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    setPage((p) => Math.max(1, p - 1))
                                }
                                aria-disabled={page === 1}
                                tabIndex={page === 1 ? -1 : 0}
                                style={{
                                    pointerEvents:
                                        page === 1 ? "none" : undefined,
                                }}
                            />
                        </PaginationItem>
                        <PaginationItem>{page}</PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setPage((p) => p + 1)}
                                aria-disabled={orders.length === 0}
                                tabIndex={orders.length === 0 ? -1 : 0}
                                style={{
                                    pointerEvents:
                                        orders.length === 0
                                            ? "none"
                                            : undefined,
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
                {/* Seed confirmation sheet */}
                <Sheet open={seedSheetOpen} onOpenChange={setSeedSheetOpen}>
                    <SheetContent side="bottom">
                        <SheetHeader>
                            <SheetTitle>Confirm seeding</SheetTitle>
                            <SheetDescription>
                                This will set all product stock values to {initialStock} and reset reserved counts to 0. This action cannot be undone.
                            </SheetDescription>
                        </SheetHeader>
                        <SheetFooter>
                                <div className="flex flex-col gap-2 w-full">
                                <Input
                                    type="password"
                                    placeholder="Admin password"
                                    value={seedPassword}
                                    onChange={(e) => setSeedPassword(e.target.value)}
                                    className="w-full"
                                />
                                <div className="flex gap-2">
                                    <Button className="flex-1" onClick={() => setSeedSheetOpen(false)}>Cancel</Button>
                                    <Button
                                        className="flex-1"
                                        onClick={async () => {
                                            setSeeding(true);
                                            try {
                                                const res = await fetch("/api/admin/seed", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ initialStock, password: seedPassword }),
                                                });
                                                const json = await res.json();
                                                if (res.ok && json?.success) {
                                                    toast.success(`Products seeded/updated with stock = ${initialStock}`);
                                                    setSeedSheetOpen(false);
                                                    setSeedPassword("");
                                                } else if (res.status === 401) {
                                                    toast.error("Unauthorized: invalid admin password.");
                                                } else {
                                                    toast.error("Seeding failed: " + (json?.error || JSON.stringify(json)));
                                                }
                                            } catch (err) {
                                                console.error("Seed error", err);
                                                toast.error("Seeding failed. Check server logs.");
                                            } finally {
                                                setSeeding(false);
                                            }
                                        }}
                                    >
                                        {seeding ? "Seeding..." : "Confirm and Seed"}
                                    </Button>
                                </div>
                                </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>

                {/* Expire confirmation sheet */}
                <Sheet open={expireSheetOpen} onOpenChange={setExpireSheetOpen}>
                    <SheetContent side="bottom">
                        <SheetHeader>
                            <SheetTitle>Expire reservations</SheetTitle>
                            <SheetDescription>
                                This will cancel reservations that have passed their expiry and release reserved stock back to inventory.
                            </SheetDescription>
                        </SheetHeader>
                        <SheetFooter>
                                <div className="flex flex-col gap-2 w-full">
                                <Input
                                    type="password"
                                    placeholder="Admin password"
                                    value={expirePassword}
                                    onChange={(e) => setExpirePassword(e.target.value)}
                                    className="w-full"
                                />
                                <div className="flex gap-2">
                                    <Button className="flex-1" onClick={() => setExpireSheetOpen(false)}>Cancel</Button>
                                    <Button
                                        className="flex-1"
                                        onClick={async () => {
                                            setExpiring(true);
                                            try {
                                                const res = await fetch("/api/admin/expire", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: expirePassword }) });
                                                const json = await res.json();
                                                if (res.ok && json?.success) {
                                                    toast.success(`Expired ${json.expired || 0} reservations`);
                                                    setExpireSheetOpen(false);
                                                    setExpirePassword("");
                                                } else if (res.status === 401) {
                                                    toast.error("Unauthorized: invalid admin password.");
                                                } else {
                                                    toast.error("Expire failed: " + (json?.message || JSON.stringify(json)));
                                                }
                                            } catch (err) {
                                                console.error("Expire error", err);
                                                toast.error("Expire failed. Check server logs.");
                                            } finally {
                                                setExpiring(false);
                                            }
                                        }}
                                    >
                                        {expiring ? "Expiring..." : "Confirm and Expire"}
                                    </Button>
                                </div>
                                </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
