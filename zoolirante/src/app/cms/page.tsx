
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

      {/* Item list */}
      <div className="space-y-2">
        {items[activeType].map((item: any) => (
          <div key={item.id} className="flex justify-between p-2 border rounded">
            <span>{item.name || item.title}</span>
            <div className="flex gap-2">
              <button
                className="px-2 py-1 bg-blue-500 text-black rounded"
                onClick={() => setSelectedItem(item)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-black rounded"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic form */}
      <div className="mt-6 p-4 border rounded">
        {activeType === "animal" && <AnimalForm item={selectedItem} />}
        {activeType === "event" && <EventForm item={selectedItem} />}
        {activeType === "shop" && <ShopForm item={selectedItem} />}

      </div>
    </div>
  );
}

function AnimalForm({ item }: { item: any }) {
  const [form, setForm] = useState(
    item || {
      name: "",
      species: "",
      scientific_name: "",
      habitat: "",
      age: "",
      gender: "",
      description: "",
      fun_facts: "",
      feeding_times: ["", ""],
      location_zone: "",
      conservation_status: "",
      image_url: "",
      gallery: "",
    }
  );

  const zones = data.zoo_map.zones.map((z) => z.name);
  const habitats = Array.from(new Set(data.animals.map((a) => a.habitat)));
  const conservationStatuses = Array.from(new Set(data.animals.map((a) => a.conservation_status)));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    index?: number
  ) => {
    if (index !== undefined) {
      const updatedTimes = [...form.feeding_times];
      updatedTimes[index] = e.target.value;
      setForm({ ...form, feeding_times: updatedTimes });
    } else {
      const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
      setForm({ ...form, [e.target.name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Animal:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-bold text-xl mb-2">{item ? "Edit Animal" : "Add Animal"}</h2>
      {/* Basic Fields */}
      <input name="name" value={form.name} placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="species" value={form.species} placeholder="Species" onChange={handleChange} className="border p-2 w-full" />
      <input name="scientific_name" value={form.scientific_name} placeholder="Scientific Name" onChange={handleChange} className="border p-2 w-full" />

      {/* Select Fields */}
      <select name="habitat" value={form.habitat} onChange={handleChange} className="border p-2 w-full">
        <option value="">Select Habitat</option>
        {habitats.map((h) => <option key={h} value={h}>{h}</option>)}
      </select>
      <select name="location_zone" value={form.location_zone} onChange={handleChange} className="border p-2 w-full">
        <option value="">Select Zone</option>
        {zones.map((z) => <option key={z} value={z}>{z}</option>)}
      </select>
      <select name="conservation_status" value={form.conservation_status} onChange={handleChange} className="border p-2 w-full">
        <option value="">Select Status</option>
        {conservationStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      <input name="age" type="number" value={form.age} placeholder="Age" onChange={handleChange} className="border p-2 w-full" />
      <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 w-full">
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} className="border p-2 w-full" />

      {form.feeding_times.map((time: string, idx: number) => (
        <input key={idx} type="time" value={time} onChange={(e) => handleChange(e, idx)} className="border p-2 w-full" />
      ))}

      <input name="fun_facts" value={form.fun_facts} placeholder="Fun Facts (comma separated)" onChange={handleChange} className="border p-2 w-full" />
      <input name="image_url" value={form.image_url} placeholder="Image URL" onChange={handleChange} className="border p-2 w-full" />
          <input name="gallery" value={form.gallery} placeholder="Gallery URLs (comma separated)" onChange={handleChange} className="border p-2 w-full" />
    
          <button type="submit" className="bg-green-600 text-black px-4 py-2 rounded">{item ? "Update Animal" : "Add Animal"}</button>
        </form>
      );
    }
    
    // --------------------
    // Event Form
    function EventForm({ item }: { item: any }) {
      const [form, setForm] = useState(
        item || {
          title: "",
          description: "",
          date: "",
          start_time: "",
          end_time: "",
          location: "",
          category: "",
          animals_featured: "",
          capacity: "",
          ticket_required: false,
          additional_cost: "",
          age_restriction: "",
          image_url: "",
        }
      );
    
      const locations = Array.from(new Set(data.events.map((e) => e.location)));
      const categories = Array.from(new Set(data.events.map((e) => e.category)));
    
      const handleChange = (e: any) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm({ ...form, [e.target.name]: value });
      };
    
      const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Submitting Event:", form);
      };
    
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="font-bold text-xl mb-2">{item ? "Edit Event" : "Add Event"}</h2>
          <input name="title" value={form.title} placeholder="Title" onChange={handleChange} className="border p-2 w-full" />
          <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
          <input name="date" type="date" value={form.date} onChange={handleChange} className="border p-2 w-full" />
          <input name="start_time" type="time" value={form.start_time} onChange={handleChange} className="border p-2 w-full" />
          <input name="end_time" type="time" value={form.end_time} onChange={handleChange} className="border p-2 w-full" />
    
          <select name="location" value={form.location} onChange={handleChange} className="border p-2 w-full">
            <option value="">Select Location</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
    
          <select name="category" value={form.category} onChange={handleChange} className="border p-2 w-full">
            <option value="">Select Category</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
    
          <input name="capacity" type="number" value={form.capacity} placeholder="Capacity" onChange={handleChange} className="border p-2 w-full" />
          <label>
            <input name="ticket_required" type="checkbox" checked={form.ticket_required} onChange={handleChange} /> Ticket Required
          </label>
          <input name="additional_cost" type="number" value={form.additional_cost} placeholder="Additional Cost" onChange={handleChange} className="border p-2 w-full" />
          <input name="age_restriction" value={form.age_restriction} placeholder="Age Restriction" onChange={handleChange} className="border p-2 w-full" />
          <input name="animals_featured" value={form.animals_featured} placeholder="Featured Animal IDs (comma separated)" onChange={handleChange} className="border p-2 w-full" />
          <input name="image_url" value={form.image_url} placeholder="Image URL" onChange={handleChange} className="border p-2 w-full" />
    
          <button type="submit" className="bg-green-600 text-black px-4 py-2 rounded">{item ? "Update Event" : "Add Event"}</button>
        </form>
      );
    }

// --------------------
// Shop Form
function ShopForm({ item }: { item: any }) {
  const [form, setForm] = useState(
    item || {
      name: "",
      category: "",
      price: "",
      description: "",
      sizes: "",
      colors: "",
      stock: "",
      featured_animal: "",
      image_url: "",
    }
  );

  const categories = Array.from(new Set(data.merchandise.map((m) => m.category)));

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitting Shop Item:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-bold text-xl mb-2">{item ? "Edit Shop Item" : "Add Shop Item"}</h2>
      <input name="name" value={form.name} placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
      <select name="category" value={form.category} onChange={handleChange} className="border p-2 w-full">
        <option value="">Select Category</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <input name="price" type="number" value={form.price} placeholder="Price" onChange={handleChange} className="border p-2 w-full" />
      <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
      <input name="sizes" value={form.sizes} placeholder="Sizes (comma separated)" onChange={handleChange} className="border p-2 w-full" />
      <input name="colors" value={form.colors} placeholder="Colors (comma separated)" onChange={handleChange} className="border p-2 w-full" />
      <input name="stock" type="number" value={form.stock} placeholder="Stock" onChange={handleChange} className="border p-2 w-full" />
      <input name="featured_animal" value={form.featured_animal} placeholder="Featured Animal ID" onChange={handleChange} className="border p-2 w-full" />
      <input name="image_url" value={form.image_url} placeholder="Image URL" onChange={handleChange} className="border p-2 w-full" />

      <button type="submit" className="bg-green-600 text-black px-4 py-2 rounded">{item ? "Update Shop Item" : "Add Shop Item"}</button>
    </form>
  );
}



