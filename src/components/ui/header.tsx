"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "./button";
import {
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    ListIcon,
} from "@phosphor-icons/react";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
} from "./navigation-menu";
import { useSearch } from "@/contexts/SearchContext";
import { useRouter } from "next/navigation";

function Header() {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window === "undefined") return true;
        const stored = localStorage.getItem("theme");
        if (stored) return stored === "dark";
        return document.documentElement.classList.contains("dark");
    });
    const { searchQuery, setSearchQuery } = useSearch();
    const router = useRouter();

    useEffect(() => {
        // Initialize theme from localStorage or system
        const stored = localStorage.getItem("theme");
        if (stored === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        } else if (stored === "light") {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        } else {
            setIsDark(document.documentElement.classList.contains("dark"));
        }
    }, []);

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        if (newDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const totalItems = cart.reduce(
                (sum: number, item: any) => sum + item.quantity,
                0
            );
            setCartCount(totalItems);
        };

        // Initial load
        updateCartCount();

        // Listen for storage changes
        const handleStorageChange = () => {
            updateCartCount();
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const toggleSearch = () => {
        if (window.location.pathname === "/catalog") {
            setIsSearchExpanded(!isSearchExpanded);
        } else {
            // Use Next.js router for navigation
            router.push("/catalog");
        }
    };
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 relative">
                    {/* Menu Button (Mobile) */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileMenu}
                            className="md:hidden hover:bg-white/10 rounded-full transition-colors duration-200 z-10"
                            aria-label="Toggle menu">
                            <ListIcon
                                weight="bold"
                                className="h-6 w-6 text-gray-900 dark:text-white"
                            />
                        </Button>

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center md:static absolute left-1/2 transform max-md:-translate-x-1/2 md:transform-none">
                        <Link href="/" className="flex items-center justify-center group">
                            <div className="flex items-center gap-2">
                                <p className="text-gray-900 font-bold text-lg font-display tracking-wide whitespace-nowrap">ZEM STUDIOS</p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation Links (Desktop) */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="space-x-8 flex">
                            <NavigationMenuItem>
                                <Link
                                    href="/"
                                    className="text-gray-900 hover:text-gray-600 px-3 py-2 font-medium transition-colors duration-200 text-sm">
                                    Home
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link
                                    href="/catalog"
                                    className="text-gray-900 hover:text-gray-600 px-3 py-2 font-medium transition-colors duration-200 text-sm">
                                    Shop
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Search, Cart, and Actions */}
                    <div className="flex items-center space-x-1 z-10">
                        {/* Search Bar - Desktop */}
                        <div className="relative hidden md:block">
                            <div
                                className={`flex items-center transition-all duration-300 ease-in-out ${
                                    isSearchExpanded ? "w-64" : "w-10"
                                }`}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className={`transition-all duration-300 ease-in-out border border-gray-300 bg-white text-gray-900 rounded-none px-4 py-2 text-sm focus:outline-none focus:border-gray-900 ${
                                        isSearchExpanded
                                            ? "w-full opacity-100 transform scale-100"
                                            : "w-0 opacity-0 transform scale-95"
                                    }`}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleSearch}
                                    className="flex items-center justify-center rounded-none hover:bg-gray-100 focus:outline-none absolute right-0 transition-all duration-200"
                                    aria-label="Search">
                                    <MagnifyingGlassIcon
                                        weight="bold"
                                        className="h-5 w-5 text-gray-900"
                                    />
                                </Button>
                            </div>
                        </div>

                        {/* Search Button - Mobile */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSearch}
                            className="md:hidden flex items-center justify-center rounded-none hover:bg-gray-100 focus:outline-none transition-all duration-200"
                            aria-label="Search">
                            <MagnifyingGlassIcon
                                weight="bold"
                                className="h-5 w-5 text-gray-900"
                            />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/cart")}
                            className="relative flex items-center justify-center rounded-none hover:bg-gray-100 focus:outline-none transition-all duration-200 group">
                            <ShoppingBagIcon
                                weight="bold"
                                className="h-5 w-5 text-gray-900 group-hover:text-gray-600 transition-colors duration-200"
                            />
                            {/* Cart Badge */}
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Search Dropdown */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isSearchExpanded
                            ? "max-h-20 opacity-100"
                            : "max-h-0 opacity-0"
                    }`}>
                    <div className="border-t border-gray-200 bg-white px-4 py-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full border border-gray-300 bg-white text-gray-900 rounded-none px-4 py-2 text-sm focus:outline-none focus:border-gray-900"
                        />
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen
                            ? "max-h-64 opacity-100"
                            : "max-h-0 opacity-0"
                    }`}>
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-col items-start px-2 pt-2 pb-3 space-y-1">
                            <NavigationMenuItem>
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 text-sm font-medium text-gray-900 rounded-none transition-all duration-200">
                                    Home
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link
                                    href="/catalog"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 font-medium text-gray-900 rounded-none transition-all duration-200 text-sm">
                                    Shop
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </header>
    );
}

export default Header;
