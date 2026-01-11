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
            <section className="w-full border-b border-gray-100">
                <div 
                    className="min-h-96 sm:min-h-[500px] flex items-center justify-center relative"
                    style={{
                        backgroundImage: "url('/zem-t 1.svg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {/* Overlay - Modern gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display text-white mb-6 leading-tight">The Future Wears Zem</h1>
                        <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                            Cutting-edge apparel for the bold and creative. Engineered for impact.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-10 justify-center">
                            <a
                                href="/catalog"
                                className="inline-flex items-center justify-center px-10 py-3.5 bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Shop Now
                            </a>
                            <a
                                href="#featured"
                                className="inline-flex items-center justify-center px-10 py-3.5 border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                                Explore
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section id="featured" className="w-full bg-white py-20 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold font-display text-gray-900 mb-4">Featured Collection</h2>
                        <div className="w-16 h-1 bg-gray-900"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.slice(0, 5).map((product: ProductT) => (
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
            <section className="w-full bg-gradient-to-r from-gray-900 to-gray-800 py-20 sm:py-32">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">Stay in the Loop</h3>
                    <p className="text-gray-300 mb-10 text-lg">Get exclusive access to new collections and early releases.</p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:outline-none font-medium transition-all"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-3 bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    );
}
