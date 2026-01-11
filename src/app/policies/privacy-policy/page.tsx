"use client";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <section className="w-full bg-white py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900 mb-8">Privacy Policy</h1>
                    
                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Introduction</h2>
                            <p>
                                ZEM STUDIOS ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Information We Collect</h2>
                            <p>We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Personal Data:</strong> When you make a purchase or create an account, we may collect your name, email address, mailing address, phone number, and payment information.</li>
                                <li><strong>Device Data:</strong> We may collect information about your device, including IP address, browser type, operating system, and pages visited.</li>
                                <li><strong>Usage Data:</strong> We automatically collect information about your interactions with our website, including the time and date of your visit.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Use of Your Information</h2>
                            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Process your transactions and send related information.</li>
                                <li>Email regarding your account or order.</li>
                                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the site.</li>
                                <li>Generate a personal profile about you so that future visits to the site will be personalized.</li>
                                <li>Increase the efficiency and operation of the site.</li>
                                <li>Monitor and analyze usage and trends to improve your experience with the site.</li>
                                <li>Notify you of updates to the site.</li>
                                <li>Offer new products, services, and/or recommendations to you.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Disclosure of Your Information</h2>
                            <p>We may share information we have collected about you in certain situations:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information is necessary to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.</li>
                                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us, such as payment processors, shipping partners, and data analytics companies.</li>
                                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Security of Your Information</h2>
                            <p>
                                We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Contact Us</h2>
                            <p>
                                If you have questions or comments about this Privacy Policy, please contact us at:
                            </p>
                            <p className="mt-4">
                                <strong>ZEM STUDIOS</strong><br />
                                Email: support@zemstudios.com<br />
                                Address: Lagos, Nigeria
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
                            <p>
                                We reserve the right to modify this privacy policy at any time. Please review it frequently. Changes and clarifications will take effect immediately upon their posting to the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
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
