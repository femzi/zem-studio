export interface ProductT {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
}

const products: ProductT[] = [
    {
        id: "skull-cap",
        title: "Zem Studio Skull Cap",
        price: 20000,
        image: "/skull-cap.jpg",
        category: "Headwear",
    },
    {
        id: "classic-polo",
        title: "Zem Studio Classic Polo",
        price: 22000,
        image: "/polo.jpg",
        category: "tops",
    },
    {
        id: "crop-top-tank",
        title: "Zem Studio Crop Tank",
        price: 18000,
        image: "/tank-top3.jpg",
        category: "tops",
    },
    {
        id: "jogger-black",
        title: "Zem Studio Jogger - Black",
        price: 25000,
        image: "/jeans.jpg",
        category: "bottoms",
    },
    {
        id: "jogger-grey",
        title: "Zem Studio Jogger - Grey",
        price: 25000,
        image: "/zemjeans.jpg",
        category: "bottoms",
    },
    {
        id: "jorts-classic",
        title: "Zem Studio Jorts - Distressed",
        price: 21000,
        image: "/jorts-one.jpg",
        category: "bottoms",
    },
    {
        id: "sleeveless-top",
        title: "Zem Studio Sleeveless Top",
        price: 16000,
        image: "/tank-top.jpg",
        category: "tops",
    },
];

export { products };
