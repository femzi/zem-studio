"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
    XLogoIcon,
    FacebookLogoIcon,
    InstagramLogoIcon,
} from "@phosphor-icons/react";

function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* About */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
                            <p className="text-sm text-gray-600">Premium apparel designed for the modern individual.</p>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link></li>
                                <li><Link href="/policies/shipping-policy" className="text-sm text-gray-600 hover:text-gray-900">Shipping</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><Link href="/policies/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</Link></li>
                                <li><Link href="/policies/terms-of-service" className="text-sm text-gray-600 hover:text-gray-900">Terms</Link></li>
                                <li><Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">Admin</Link></li>
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Follow</h3>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="https://www.instagram.com/zempmc/?igsh=MmQ0endreGhpajVn&utm_source=qr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                    aria-label="Instagram">
                                    <InstagramLogoIcon weight="bold" className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                    aria-label="Facebook">
                                    <FacebookLogoIcon weight="bold" className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                                    aria-label="Twitter">
                                    <XLogoIcon weight="bold" className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Divider and Copyright */}
                    <div className="border-t border-gray-200 pt-8">
                        <p className="text-center text-sm text-gray-600">
                            © {new Date().getFullYear()} ZEM STUDIOS. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
