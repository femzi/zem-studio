"use client";

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full bg-white py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900">About Zem Studios</h1>
            <p className="mt-4 text-lg text-gray-600">Design-driven apparel for a forward-thinking world.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Born from a love of minimal, purposeful design and a desire to push fashion forward,
                Zem Studios crafts apparel that sits at the intersection of art, technology and
                everyday wearability. We design with intention — choosing materials, cuts and
                details that stand the test of time.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Our Mission</h3>
              <p className="text-gray-700 mb-4">
                To build thoughtful garments that empower self-expression while minimizing waste.
                We prioritize quality, clarity of design, and ethical partners throughout our
                production process.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Sustainability</h3>
              <p className="text-gray-700 mb-4">
                We work with suppliers who share our values and continually evaluate our choices to
                reduce environmental impact — from material selection to packaging and shipping.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-display text-gray-900 mb-4">What We Make</h2>
              <p className="text-gray-700 mb-4">
                Clean silhouettes, modern materials, and precise finishing. Our collections focus on
                elevated basics and statement pieces engineered for longevity.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Craft & Quality</h3>
              <p className="text-gray-700 mb-4">
                Each piece is inspected before shipping — we believe in garments that feel as good
                as they look. Sourcing and construction decisions are made to ensure consistent
                performance season after season.
              </p>

              <div className="mt-8 bg-gray-50 p-6 rounded">
                <h4 className="text-lg font-semibold mb-2">Join the Movement</h4>
                <p className="text-gray-700 mb-4">Sign up for updates and be the first to know about new drops.</p>
                <a
                  href="/contact"
                  className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all duration-200"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} ZEM STUDIOS. All rights reserved.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
