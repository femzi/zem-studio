"use client";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Here you would typically send the form data to a backend/email service
            // For now, we'll just simulate a successful submission
            console.log("Form submitted:", formData);
            setSubmitted(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                setSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <section className="w-full bg-white py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-600 mb-12">
                        Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            {submitted && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
                                    <p className="text-green-800 font-medium">Thank you! We've received your message and will get back to you soon.</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors"
                                        placeholder="+234 123 456 7890"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors bg-white"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="product-inquiry">Product Inquiry</option>
                                        <option value="order-issue">Order Issue</option>
                                        <option value="shipping">Shipping Question</option>
                                        <option value="feedback">General Feedback</option>
                                        <option value="collaboration">Collaboration</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors resize-none"
                                        placeholder="Tell us how we can help..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full px-8 py-4 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 p-8 space-y-8">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Email</h3>
                                    <a href="mailto:support@zemstudios.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                                        support@zemstudios.com
                                    </a>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Phone</h3>
                                    <a href="tel:+2341234567890" className="text-gray-600 hover:text-gray-900 transition-colors">
                                        +234 (123) 456-7890
                                    </a>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Location</h3>
                                    <p className="text-gray-600">
                                        Lagos, Nigeria
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Business Hours</h3>
                                    <p className="text-gray-600 text-sm space-y-1">
                                        <div>Monday - Friday</div>
                                        <div>9:00 AM - 6:00 PM</div>
                                        <div className="mt-2">Saturday - Sunday</div>
                                        <div>Closed</div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
