"use client";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <section className="w-full bg-white py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900 mb-8">Terms of Service</h1>
                    
                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Agreement to Terms</h2>
                            <p>
                                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and ZEM STUDIOS ("we," "us," "our," or "Company"), concerning your access to and use of the zem-studio website. You agree that by accessing the site, you have read, understood, and agree to be bound by all of these Terms of Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">User License</h2>
                            <p>
                                Unless otherwise stated, ZEM STUDIOS and/or its licensors own the intellectual property rights for all material on the site. All intellectual property rights are reserved. You may view and print pages from the site for personal use, subject to restrictions set in these Terms and Conditions of use.
                            </p>
                            <p className="mt-4">You must not:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Republish material from the site</li>
                                <li>Sell, rent, or sub-license material from the site</li>
                                <li>Reproduce, duplicate, or copy material for commercial purposes</li>
                                <li>Redistribute content from the site unless content is specifically made for redistribution</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Disclaimer</h2>
                            <p>
                                The information on the site is provided on an 'as is' and 'as available' basis. ZEM STUDIOS makes no representations or warranties of any kind, express or implied, as to the operation of the site or the information, content, or materials included on the site. To the fullest extent permissible by applicable law, ZEM STUDIOS disclaims all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Limitations of Liability</h2>
                            <p>
                                In no event shall ZEM STUDIOS, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract, tort, or otherwise, and whether or not we have been told of the possibility of such damage being liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Accuracy of Materials</h2>
                            <p>
                                The materials appearing on our site could include technical, typographical, or photographic errors. ZEM STUDIOS does not warrant that any of the materials on the site are accurate, complete, or current. ZEM STUDIOS may make changes to the materials contained on the site at any time without notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Links</h2>
                            <p>
                                ZEM STUDIOS has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Modifications</h2>
                            <p>
                                ZEM STUDIOS may revise these Terms of Service for the site at any time without notice. By using this site, you are agreeing to be bound by the then current version of these Terms of Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Governing Law</h2>
                            <p>
                                These terms and conditions are governed by and construed in accordance with the laws of Nigeria, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-display text-gray-900 mt-8 mb-4">Contact Information</h2>
                            <p>
                                If you have any questions about these Terms of Service, please contact us at:
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
