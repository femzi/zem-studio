"use client";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function ShippingPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <section className="w-full bg-white py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900 mb-8">Shipping Policy</h1>
                    
                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Shipping Information</h2>
                            <p>
                                ZEM STUDIOS is committed to delivering your orders efficiently and safely. Please review our shipping policy below.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Processing Time</h2>
                            <p>
                                All orders are processed within 2-3 business days (Monday through Friday, excluding public holidays). You will receive a confirmation email with tracking information once your order has been dispatched.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Shipping Methods & Delivery Times</h2>
                            <ul className="list-disc pl-6 space-y-3 mt-4">
                                <li>
                                    <strong>Standard Delivery (Within Nigeria):</strong> 5-7 business days from dispatch
                                </li>
                                <li>
                                    <strong>Express Delivery (Within Nigeria):</strong> 2-3 business days from dispatch
                                </li>
                                <li>
                                    <strong>International Shipping:</strong> 10-21 business days depending on destination. International customers are responsible for any customs duties and import taxes.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Shipping Costs</h2>
                            <p>
                                Shipping costs will be calculated and displayed at checkout based on your location and selected shipping method. Free shipping may be available for orders over a certain amount as stated during checkout.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Tracking Your Order</h2>
                            <p>
                                Once your order is dispatched, you will receive an email with a tracking number. You can use this number to track your package through our shipping partner's website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Delayed or Lost Shipments</h2>
                            <p>
                                While we strive to ensure all shipments arrive on time, delays can occasionally occur due to circumstances beyond our control. If your order is significantly delayed or appears to be lost:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Wait 24 hours after the expected delivery date.</li>
                                <li>Check the tracking information for updates.</li>
                                <li>Contact our customer service team with your order number and tracking information.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Delivery Address</h2>
                            <p>
                                We recommend providing a complete and accurate delivery address. ZEM STUDIOS is not responsible for packages delivered to incorrect addresses provided by the customer during checkout.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Contact Us</h2>
                            <p>
                                For shipping-related inquiries, please contact our customer service team:
                            </p>
                            <p className="mt-4">
                                <strong>ZEM STUDIOS</strong><br />
                                Email: support@zemstudios.com<br />
                                Address: Lagos, Nigeria
                            </p>
                        </section>

                        <section>
                            <p className="text-sm text-gray-500 mt-12">
                                Last Updated: January 2026
                            </p>
                        </section>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
