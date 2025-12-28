"use client";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Product from "@/components/ui/product";
import { ProductT, products } from "@/data/products";

export default function Home() {
    return (
        <div className="font-sans">
            <Header />
            {/* Hero Intro Section */}
            <section className="max-w-7xl mx-auto px-8 sm:px-16 md:px-32 py-16 md:py-24">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Welcome to Zem Studio
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                        Discover premium apparel designed for the modern individual. Each piece is crafted with attention to detail and quality, blending style with comfort.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <a
                            href="/catalog"
                            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200">
                            Shop Now
                        </a>
                        <a
                            href="#featured"
                            className="inline-block px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200">
                            Explore Featured
                        </a>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section id="featured" className="max-w-7xl mx-auto px-8 sm:px-16 md:px-32 py-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">Featured Collection</h2>
                <div className="grid grid-cols-2 gap-8 sm:gap-16 md:grid-cols-3">
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
            </section>
            <Footer />
        </div>
    );
}
