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
    <header className="bg-white/60 dark:bg-black/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-all duration-300">
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
                            <div className="flex items-center gap-3 transition-transform duration-200 group-hover:scale-105">
                                <div className="hidden md:flex flex-col">
                                    <p className="mt-0 text-gray-900 dark:text-white font-semibold text-lg tracking-wide whitespace-nowrap">Zem Studio</p>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">premium apparel</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation Links (Desktop) */}
                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList className="space-x-8 flex">
                            <NavigationMenuItem>
                                <Link
                                    href="/"
                                    className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 font-medium hover:underline relative transition-colors duration-200 uppercase text-xs">
                                    Home
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link
                                    href="/catalog"
                                    className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 font-medium relative hover:underline tracking-tight transition-colors duration-200 uppercase text-xs">
                                    Catalog
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
                    className={`transition-all duration-300 ease-in-out border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        isSearchExpanded
                                            ? "w-full opacity-100 transform scale-100"
                                            : "w-0 opacity-0 transform scale-95"
                                    }`}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleSearch}
                                    className="flex items-center justify-center rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 absolute right-0 transition-all duration-200 hover:scale-105"
                                    aria-label="Search">
                                    <MagnifyingGlassIcon
                                        weight="bold"
                                        className="h-5 w-5 text-gray-900 dark:text-white"
                                    />
                                </Button>
                            </div>
                        </div>

                        {/* Search Button - Mobile */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSearch}
                            className="md:hidden flex items-center justify-center rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 hover:scale-105"
                            aria-label="Search">
                            <MagnifyingGlassIcon
                                weight="bold"
                                className="h-5 w-5 text-gray-900 dark:text-white"
                            />
                        </Button>

                        {/* Cart Icon */}
                        {/* Theme toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="flex items-center justify-center rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 hover:scale-105">
                            <span className="text-sm">{isDark ? "🌙" : "🌞"}</span>
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/cart")}
                            className="relative flex items-center justify-center rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 hover:scale-105 group">
                            <ShoppingBagIcon
                                weight="bold"
                                className="h-5 w-5 text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200"
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
                    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-4 py-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                    className="block py-2 text-xs uppercase font-medium text-white rounded-md transition-all duration-200 transform">
                                    Home
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link
                                    href="/catalog"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block py-2 uppercase font-medium text-white rounded-md transition-all duration-200 transform text-xs">
                                    Catalog
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
