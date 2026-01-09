import React from "react";

interface StockBadgeProps {
  inStock?: boolean;
  quantity?: number;
}

export default function StockBadge({ inStock = true, quantity }: StockBadgeProps) {
  return (
    <div
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
        inStock
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {inStock ? (
        <>
          In Stock {quantity !== undefined && `(${quantity})`}
        </>
      ) : (
        "Out of Stock"
      )}
    </div>
  );
}
