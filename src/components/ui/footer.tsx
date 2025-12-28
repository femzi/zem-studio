"use client";

import Link from "next/link";
import React from "react";
import {
    XLogoIcon,
    FacebookLogoIcon,
    InstagramLogoIcon,
} from "@phosphor-icons/react";

function Footer() {
    return (
    <footer className="bg-white/60 dark:bg-black/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between py-6">
                    {/* Logo */}
                    <div className="flex items-center mb-4 md:mb-0">
                        <Link href="/" className="flex items-center justify-center group">
                            <div className="flex items-center gap-3 transition-transform duration-200 group-hover:scale-105">
                                <p className="inline whitespace-nowrap text-gray-900 dark:text-white font-semibold tracking-wide">Zem Studio</p>
                            </div>
                        </Link>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 dark:text-white hover:text-pink-400 dark:hover:text-pink-400 transition-colors duration-200 hover:scale-110 transform"
                            aria-label="Follow us on Instagram">
                            <InstagramLogoIcon
                                weight="bold"
                                className="h-6 w-6"
                            />
                        </Link>
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 dark:text-white hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 hover:scale-110 transform"
                            aria-label="Follow us on Facebook">
                            <FacebookLogoIcon
                                weight="bold"
                                className="h-6 w-6"
                            />
                        </Link>
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 hover:scale-110 transform"
                            aria-label="Follow us on Twitter">
                            <XLogoIcon
                                weight="bold"
                                className="h-6 w-6"
                            />
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 py-4 flex-col sm:flex justify-between items-center">
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} Zem Studio. All rights
                        reserved.
                    </p>
                    <Link href={"/admin"} className="text-sm text-gray-600 dark:text-gray-400 underline">Admin</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
