"use client";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Product from "@/components/ui/product";
import { ProductT, products } from "@/data/products";

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            {/* Hero Section */}
            <section className="w-full bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="space-y-6 max-w-3xl">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-gray-900 tracking-tight">
                            Zem Studio
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                            Premium apparel designed for the modern individual. Each piece is crafted with attention to detail and quality.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-8">
                            <a
                                href="/catalog"
                                className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors duration-200">
                                Shop Collection
                            </a>
                            <a
                                href="#featured"
                                className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-200">
                                View Featured
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section id="featured" className="w-full bg-white py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-12">Featured Collection</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.slice(0, 6).map((product: ProductT) => (
                            <Product
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="w-full bg-gray-50 border-t border-gray-200 py-16 sm:py-24">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl font-light text-gray-900 mb-4">Stay Updated</h3>
                    <p className="text-gray-600 mb-8">Subscribe to our newsletter for new releases and exclusive offers.</p>
                    <form className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 transition-colors"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors duration-200">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    );
}
