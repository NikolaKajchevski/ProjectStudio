
// This marks the file as a client component so that we can use React hooks such as useState, useEffect and also handle browser interactivity
"use client";

import { useState } from "react";
import data from "../data/zooliranteData.json";

type AdminType = "animal" | "event" | "shop";

export default function AdminPanel() {
  const [activeType, setActiveType] = useState<AdminType>("animal");
  const [items, setItems] = useState({
    animal: data.animals,
    event: data.events,
    shop: data.merchandise,
  });
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleTypeChange = (type: AdminType) => {
    setActiveType(type);
    setSelectedItem(null);
  };

  const handleDelete = (id: string) => {
    setItems({
      ...items,
      [activeType]: items[activeType].filter((i: any) => i.id !== id),
    });
  };

  return (
    <div className="p-6 space-y-6 text-black">
      {/* Type selector */}
      <div className="flex gap-4 justify-center">
        {["animal", "event", "shop"].map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type as AdminType)}
            className="px-4 py-2 bg-gray-300 rounded text-black"
          >
            {type[0].toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}