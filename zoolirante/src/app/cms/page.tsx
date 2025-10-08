"use client";

import { useState, useEffect } from "react";
import data from "../data/zooliranteData.json";

type AdminType = "animal" | "event" | "shop";

interface Animal {
  id: string;
  name: string;
  species: string;
  scientific_name: string;
  habitat: string;
  age: number;
  gender: string;
  description: string;
  fun_facts: string[];
  feeding_times: string[];
  location: {
    zone: string;
    coordinates: { x: number; y: number };
  };
  conservation_status: string;
  image_url: string;
  gallery: string[];
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  category: string;
  animals_featured: string[];
  capacity: number;
  current_bookings: number;
  ticket_required: boolean;
  additional_cost: number;
  age_restriction: string;
  image_url: string;
}

interface Merchandise {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
  stock: number;
  sizes?: string[];
  colors?: string[];
  featured_animal?: string;
}

type Item = Animal | Event | Merchandise;

interface FormProps<T> {
  item: T | null;
  onSubmitSuccess: (updatedItem: T) => void;
}

export default function AdminPanel() {
  const [activeType, setActiveType] = useState<AdminType>("animal");
  const [items, setItems] = useState({
    animal: data.animals as Animal[],
    event: data.events as Event[],
    shop: data.merchandise as Merchandise[],
  });
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/zooliranteData");
      if (!response.ok) throw new Error("Failed to fetch data");
      const allData = await response.json();
      setItems({
        animal: allData.animals,
        event: allData.events,
        shop: allData.merchandise,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTypeChange = (type: AdminType) => {
    setActiveType(type);
    setSelectedItem(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/zooliranteData?id=${id}&type=${activeType}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setItems((prev) => ({
          ...prev,
          [activeType]: prev[activeType].filter((i: any) => i.id !== id),
        }));
      } else {
        const errorData = await response.json();
        console.error("Failed to delete item:", errorData.error);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleFormSubmit = <T extends Item>(updatedItem: T) => {
    if (selectedItem) {
      const index = items[activeType].findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        const newItems = [...items[activeType]] as T[];
        newItems[index] = updatedItem;
        setItems((prev) => ({ ...prev, [activeType]: newItems }));
      }
    } else {
      setItems((prev) => ({
        ...prev,
        [activeType]: [...(prev[activeType] as T[]), updatedItem],
      }));
    }
    setSelectedItem(null);
    fetchData();
  };

  return (
    <div className="p-6 space-y-6 text-black bg-gray-50 min-h-screen">
      {/* Type Selector */}
      <div className="flex flex-wrap gap-4 justify-center">
        {["animal", "event", "shop"].map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type as AdminType)}
            className={`px-4 py-2 rounded-lg shadow-sm transition ${
              activeType === type
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            {type[0].toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Item List */}
      <div className="max-h-80 overflow-y-auto border rounded-lg p-4 bg-white shadow-inner">
        <h3 className="font-semibold text-lg mb-2 capitalize">{activeType} List</h3>
        <div className="space-y-2">
          {items[activeType].map((item: any) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 border rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              <span className="font-medium truncate">
                {item.name || item.title}
              </span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  onClick={() => setSelectedItem(item)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div className="mt-6 p-6 border rounded-lg bg-white shadow-md">
        {activeType === "animal" && (
          <AnimalForm item={selectedItem as Animal | null} onSubmitSuccess={handleFormSubmit} />
        )}
        {activeType === "event" && (
          <EventForm item={selectedItem as Event | null} onSubmitSuccess={handleFormSubmit} />
        )}
        {activeType === "shop" && (
          <ShopForm item={selectedItem as Merchandise | null} onSubmitSuccess={handleFormSubmit} />
        )}
      </div>
    </div>
  );
}

/* -------------------- Animal Form -------------------- */
function AnimalForm({ item, onSubmitSuccess }: FormProps<Animal>) {
  const [form, setForm] = useState<Omit<Animal, "id" | "fun_facts" | "gallery" | "location"> & {
    fun_facts: string;
    gallery: string;
    location_zone: string;
  }>({
    name: "",
    species: "",
    scientific_name: "",
    habitat: "",
    age: 0,
    gender: "",
    description: "",
    fun_facts: "",
    feeding_times: ["", ""],
    location_zone: "",
    conservation_status: "",
    image_url: "",
    gallery: "",
  });

  useEffect(() => {
    if (item) {
      setForm({
        ...item,
        age: item.age || 0,
        fun_facts: item.fun_facts?.join(", ") || "",
        gallery: item.gallery?.join(", ") || "",
        location_zone: item.location.zone,
      });
    } else {
      setForm({
        name: "",
        species: "",
        scientific_name: "",
        habitat: "",
        age: 0,
        gender: "",
        description: "",
        fun_facts: "",
        feeding_times: ["", ""],
        location_zone: "",
        conservation_status: "",
        image_url: "",
        gallery: "",
      });
    }
  }, [item]);

  const zones = data.zoo_map.zones.map((z) => z.name);
  const habitats = [...new Set(data.animals.map((a) => a.habitat))];
  const conservationStatuses = [...new Set(data.animals.map((a) => a.conservation_status))];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index?: number) => {
    if (index !== undefined) {
      const updated = [...form.feeding_times];
      updated[index] = e.target.value;
      setForm({ ...form, feeding_times: updated });
    } else {
      const { name, value, type } = e.target;
      setForm({ ...form, [name]: type === "number" ? Number(value) : value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = !!item;
    const payload = {
      ...form,
      id: item?.id,
      fun_facts: form.fun_facts.split(",").map((f) => f.trim()).filter(Boolean),
      gallery: form.gallery.split(",").map((g) => g.trim()).filter(Boolean),
      age: Number(form.age),
      location: { zone: form.location_zone, coordinates: item?.location.coordinates || { x: 0, y: 0 } },
    };

    const method = isEditing ? "PUT" : "POST";
    try {
      const res = await fetch("/api/zooliranteData", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result = await res.json();
        onSubmitSuccess(result.data.animal);
      } else console.error(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="font-bold text-2xl mb-4">{item ? "Edit Animal" : "Add Animal"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="name" value={form.name} placeholder="Name" onChange={handleChange} className="border p-2 rounded" />
        <input name="species" value={form.species} placeholder="Species" onChange={handleChange} className="border p-2 rounded" />
        <input name="scientific_name" value={form.scientific_name} placeholder="Scientific Name" onChange={handleChange} className="border p-2 rounded" />
        <select name="habitat" value={form.habitat} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Habitat</option>
          {habitats.map((h) => <option key={h}>{h}</option>)}
        </select>
        <select name="location_zone" value={form.location_zone} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Zone</option>
          {zones.map((z) => <option key={z}>{z}</option>)}
        </select>
        <select name="conservation_status" value={form.conservation_status} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Status</option>
          {conservationStatuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <input name="age" type="number" value={form.age} placeholder="Age" onChange={handleChange} className="border p-2 rounded" />
        <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} className="border p-2 rounded w-full" />
      {form.feeding_times.map((t, i) => (
        <input key={i} type="time" value={t} onChange={(e) => handleChange(e, i)} className="border p-2 rounded w-full" />
      ))}
      <input name="fun_facts" value={form.fun_facts} placeholder="Fun Facts (comma separated)" onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="image_url" value={form.image_url} placeholder="Image URL" onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="gallery" value={form.gallery} placeholder="Gallery URLs (comma separated)" onChange={handleChange} className="border p-2 rounded w-full" />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
        {item ? "Update Animal" : "Add Animal"}
      </button>
    </form>
  );
}

/* -------------------- Event Form -------------------- */
function EventForm({ item, onSubmitSuccess }: FormProps<Event>) {
  const [form, setForm] = useState<Omit<Event, "id" | "animals_featured"> & { animals_featured: string }>({
    title: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    category: "",
    animals_featured: "",
    capacity: 0,
    current_bookings: 0,
    ticket_required: false,
    additional_cost: 0,
    age_restriction: "",
    image_url: "",
  });

  useEffect(() => {
    if (item) {
      setForm({
        ...item,
        animals_featured: item.animals_featured?.join(", ") || "",
        capacity: item.capacity || 0,
        additional_cost: item.additional_cost || 0,
      });
    } else {
      setForm({
        title: "",
        description: "",
        date: "",
        start_time: "",
        end_time: "",
        location: "",
        category: "",
        animals_featured: "",
        capacity: 0,
        current_bookings: 0,
        ticket_required: false,
        additional_cost: 0,
        age_restriction: "",
        image_url: "",
      });
    }
  }, [item]);

  const locations = [...new Set(data.events.map((e) => e.location))];
  const categories = [...new Set(data.events.map((e) => e.category))];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? Number(value) : value;
    setForm({ ...form, [name]: finalValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      id: item?.id,
      animals_featured: form.animals_featured.split(",").map((a) => a.trim()).filter(Boolean),
    };
    const method = item ? "PUT" : "POST";
    try {
      const res = await fetch("/api/zooliranteData", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result = await res.json();
        onSubmitSuccess(result.data.event);
      } else console.error(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="font-bold text-2xl mb-4">{item ? "Edit Event" : "Add Event"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="title" value={form.title} placeholder="Title" onChange={handleChange} className="border p-2 rounded" />
        <input name="date" type="date" value={form.date} onChange={handleChange} className="border p-2 rounded" />
        <input name="start_time" type="time" value={form.start_time} onChange={handleChange} className="border p-2 rounded" />
        <input name="end_time" type="time" value={form.end_time} onChange={handleChange} className="border p-2 rounded" />
        <select name="location" value={form.location} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Location</option>
          {locations.map((l) => <option key={l}>{l}</option>)}
        </select>
        <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Category</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input name="capacity" type="number" value={form.capacity} placeholder="Capacity" onChange={handleChange} className="border p-2 rounded" />
        <input name="additional_cost" type="number" value={form.additional_cost} placeholder="Additional Cost" onChange={handleChange} className="border p-2 rounded" />
        <input name="age_restriction" value={form.age_restriction} placeholder="Age Restriction" onChange={handleChange} className="border p-2 rounded" />
      </div>

      <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} className="border p-2 rounded w-full" />
      <label className="flex items-center gap-2">
        <input type="checkbox" name="ticket_required" checked={form.ticket_required} onChange={handleChange} />
        Ticket Required
      </label>
      <input name="animals_featured" value={form.animals_featured} placeholder="Featured Animal IDs (comma separated)" onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="image_url" value={form.image_url} placeholder="Image URL" onChange={handleChange} className="border p-2 rounded w-full" />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
        {item ? "Update Event" : "Add Event"}
      </button>
    </form>
  );
}

/* -------------------- Shop Form -------------------- */
function ShopForm({ item, onSubmitSuccess }: FormProps<Merchandise>) {
  const [form, setForm] = useState<Omit<Merchandise, "id" | "sizes" | "colors"> & { sizes: string; colors: string }>({
    name: "",
    category: "",
    price: 0,
    description: "",
    sizes: "",
    colors: "",
    stock: 0,
    featured_animal: "",
    image_url: "",
  });

  useEffect(() => {
    if (item) {
      setForm({
        ...item,
        price: item.price || 0,
        stock: item.stock || 0,
        sizes: item.sizes?.join(", ") || "",
        colors: item.colors?.join(", ") || "",
      });
    } else {
      setForm({
        name: "",
        category: "",
        price: 0,
        description: "",
        sizes: "",
        colors: "",
        stock: 0,
        featured_animal: "",
        image_url: "",
      });
    }
  }, [item]);

  const categories = [...new Set(data.merchandise.map((m) => m.category))];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === "number" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      id: item?.id,
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
    };
    const method = item ? "PUT" : "POST";
    try {
      const res = await fetch("/api/zooliranteData", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result = await res.json();
        onSubmitSuccess(result.data.merchandise);
      } else console.error(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="font-bold text-2xl mb-4">{item ? "Edit Shop Item" : "Add Shop Item"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="name" value={form.name} placeholder="Name" onChange={handleChange} className="border p-2 rounded" />
        <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded">
          <option value="">Select Category</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input name="price" type="number" value={form.price} placeholder="Price" onChange={handleChange} className="border p-2 rounded" />
        <input name="stock" type="number" value={form.stock} placeholder="Stock" onChange={handleChange} className="border p-2 rounded" />
      </div>
      <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="sizes" value={form.sizes} placeholder="Sizes (comma separated)" onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="colors" value={form.colors} placeholder="Colors (comma separated)" onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="featured_animal" value={form.featured_animal} placeholder="Featured Animal ID" onChange={handleChange} className="border p-2 rounded w-full" />
      <input name="image_url" value={form.image_url} placeholder="Image URL" onChange={handleChange} className="border p-2 rounded w-full" />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
        {item ? "Update Shop Item" : "Add Shop Item"}
      </button>
    </form>
  );
}
