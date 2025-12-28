"use client";

import React, { useEffect, useState } from "react";

interface Props {
  id: string;
}

export default function StockBadge({ id }: Props) {
  const [available, setAvailable] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/stock?id=${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error("Failed to load stock");
        const json = await res.json();
        if (!mounted) return;
        setAvailable(typeof json.available === "number" ? json.available : 0);
      } catch (e) {
        console.error("Stock fetch error", e);
        if (mounted) setAvailable(0);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <p className="text-sm text-gray-500 dark:text-gray-400">Checking stock…</p>;
  if (available === null) return null;

  if (available <= 0) {
    return <p className="text-sm font-medium text-red-600 dark:text-red-400">Out of stock</p>;
  }

  if (available <= 5) {
    return (
      <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
        {available === 1 ? "Only 1 left" : `Only ${available} left`}
      </p>
    );
  }

  return (
    <p className="text-sm font-medium text-green-700 dark:text-green-400">
      {available === 1 ? "1 in stock" : `${available} in stock`}
    </p>
  );
}
