export interface ProductT {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
}

const products: ProductT[] = [
    // Five featured items first
    { id: "zem-odyssey-01-polo-black", title: "Zem- ODYSSEY 01 Polo (Black)", price: 25000, image: "/Zem- ODYSSEY 01 Polo (Black).svg", category: "All" },
    { id: "zem-odyssey-01-polo-gray", title: "Zem- ODYSSEY 01 Polo (Gray)", price: 25000, image: "/Zem- ODYSSEY 01 Polo (Gray).svg", category: "All" },
    { id: "zem-odyssey-01-polo-pink", title: "Zem- ODYSSEY 01 Polo (Pink)", price: 25000, image: "/Zem- ODYSSEY 01 Polo (Pink).svg", category: "All" },
    { id: "zem-odyssey-01-polo-purple", title: "Zem- ODYSSEY 01 Polo (Purple)", price: 25000, image: "/Zem- ODYSSEY 01 Polo (Purple).svg", category: "All" },
    { id: "girls-trendsetter-tee-black", title: "Girls TRENDSETTER TEE (Black)", price: 10000, image: "/Girls TRENDSETTER TEE (Black).svg", category: "All" },

    // All other SVGs in public/ — added to catalog using their exact file names as titles
    { id: "girls-trendsetter-tee-brown", title: "Girls TRENDSETTER TEE (Brown)", price: 10000, image: "/Girls TRENDSETTER TEE (Brown).svg", category: "All" },
    { id: "girls-trendsetter-tee-gray", title: "Girls TRENDSETTER TEE (Gray)", price: 10000, image: "/Girls TRENDSETTER TEE (Gray).svg", category: "All" },
    { id: "girls-trendsetter-tee-pink", title: "Girls TRENDSETTER TEE (Pink)", price: 10000, image: "/Girls TRENDSETTER TEE (Pink).svg", category: "All" },
    { id: "girls-trendsetter-tee-purple", title: "Girls TRENDSETTER TEE (Purple)", price: 10000, image: "/Girls TRENDSETTER TEE (Purple).svg", category: "All" },
    { id: "girls-trendsetter-tee-white", title: "Girls TRENDSETTER TEE (White)", price: 10000, image: "/Girls TRENDSETTER TEE (White).svg", category: "All" },

    { id: "zem-001-double-waisted-black", title: "ZEM 001 Double Waisted (Black)", price: 15000, image: "/ZEM 001 Double Waisted (Black).svg", category: "All" },
    { id: "zem-001-double-waisted-brown", title: "ZEM 001 Double Waisted (Brown)", price: 15000, image: "/ZEM 001 Double Waisted (Brown).svg", category: "All" },
    { id: "zem-001-double-waisted-gray", title: "ZEM 001 Double Waisted (Gray)", price: 15000, image: "/ZEM 001 Double Waisted (Gray).svg", category: "All" },
    { id: "zem-001-double-waisted-pink", title: "ZEM 001 Double Waisted (Pink)", price: 15000, image: "/ZEM 001 Double Waisted (Pink).svg", category: "All" },
    { id: "zem-001-double-waisted-purple", title: "ZEM 001 Double Waisted (Purple)", price: 15000, image: "/ZEM 001 Double Waisted (Purple).svg", category: "All" },
    { id: "zem-001-double-waisted-white", title: "ZEM 001 Double Waisted (White)", price: 15000, image: "/ZEM 001 Double Waisted (White).svg", category: "All" },

    { id: "zem-barbie-crop-top-black", title: "ZEM BARBIE Crop Top (Black)", price: 10000, image: "/ZEM BARBIE Crop Top (Black).svg", category: "All" },
    { id: "zem-barbie-crop-top-brown", title: "ZEM BARBIE Crop Top (Brown)", price: 10000, image: "/ZEM BARBIE Crop Top (Brown).svg", category: "All" },
    { id: "zem-barbie-crop-top-camo", title: "ZEM BARBIE Crop Top (Camo)", price: 10000, image: "/ZEM BARBIE Crop Top (Camo).svg", category: "All" },
    { id: "zem-barbie-crop-top-pink", title: "ZEM BARBIE Crop Top (Pink)", price: 10000, image: "/ZEM BARBIE Crop Top (Pink).svg", category: "All" },

    { id: "zem-startup-sleeves-tee-black", title: "ZEM STARTUP SLEEVES TEE (Black)", price: 15000, image: "/ZEM STARTUP SLEEVES TEE (Black).svg", category: "All" },
    { id: "zem-startup-sleeves-tee-white", title: "ZEM STARTUP SLEEVES TEE (White)", price: 15000, image: "/ZEM STARTUP SLEEVES TEE (White).svg", category: "All" },
    { id: "zem-startup-tank-top-black", title: "ZEM STARTUP TANK TOP (Black) ", price: 12000, image: "/ZEM STARTUP TANK TOP (Black) .svg", category: "All" },
    { id: "zem-startup-tank-top-white", title: "ZEM STARTUP TANK TOP (White) ", price: 12000, image: "/ZEM STARTUP TANK TOP (White) .svg", category: "All" },

    { id: "zem-swago-polo-black", title: "ZEM SWAGO POLO (Black)", price: 20000, image: "/ZEM SWAGO POLO (Black).svg", category: "All" },
    { id: "zem-swago-polo-pink", title: "ZEM SWAGO POLO (Pink)", price: 20000, image: "/ZEM SWAGO POLO (Pink).svg", category: "All" },
    { id: "zem-swago-polo-red", title: "ZEM SWAGO POLO (Red)", price: 20000, image: "/ZEM SWAGO POLO (Red).svg", category: "All" },

    { id: "zem-street-republic-tee-black", title: "ZEM Street Republic Tee (Black)", price: 10000, image: "/ZEM Street Republic Tee (Black).svg", category: "All" },
    { id: "zem-street-republic-tee-brown", title: "ZEM Street Republic Tee (Brown)", price: 10000, image: "/ZEM Street Republic Tee (Brown).svg", category: "All" },
    { id: "zem-street-republic-tee-gray", title: "ZEM Street Republic Tee (Gray)", price: 10000, image: "/ZEM Street Republic Tee (Gray).svg", category: "All" },
    { id: "zem-street-republic-tee-pink", title: "ZEM Street Republic Tee (Pink)", price: 10000, image: "/ZEM Street Republic Tee (Pink).svg", category: "All" },
    { id: "zem-street-republic-tee-white", title: "ZEM Street Republic Tee (White)", price: 10000, image: "/ZEM Street Republic Tee (White).svg", category: "All" },
    { id: "zem-street-republic-tee-purple", title: "ZEM Street Republic Tee (purple)", price: 10000, image: "/ZEM Street Republic Tee (purple).svg", category: "All" },

    // Additional duplicates / variations
    { id: "zem-odyssey-01-polo-black-2", title: "Zem- ODYSSEY 01 Polo (Black)", price: 25000, image: "/Zem- ODYSSEY 01 Polo (Black).svg", category: "All" },
    { id: "zem-odyssey-01-polo-brown", title: "Zem- ODYSSEY 01 Polo (Brown)", price: 25000, image: "/Zem- ODYSSEY 01 Polo (Brown).svg", category: "All" },
];

export { products };
