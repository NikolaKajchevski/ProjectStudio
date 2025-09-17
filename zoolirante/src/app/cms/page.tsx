"use client";

import { useState, useEffect } from "react";
import data from "../data/zooliranteData.json";

// Type definitions for your data
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
    coordinates: {
      x: number;
      y: number;
    };
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

// Props for the forms
interface FormProps<T> {
  item: T | null;
  onSubmitSuccess: (updatedItem: T) => void;
}

export default function AdminPanel() {
  const [activeType, setActiveType] = useState<AdminType>("animal");
  const [items, setItems] = useState<{
    animal: Animal[];
    event: Event[];
    shop: Merchandise[];
  }>({
    animal: data.animals as Animal[], // Cast the imported JSON data
    event: data.events as Event[],
    shop: data.merchandise as Merchandise[],
  });
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Function to refetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('/api/zooliranteData');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const allData = await response.json();
      setItems({
        animal: allData.animals as Animal[],
        event: allData.events as Event[],
        shop: allData.merchandise as Merchandise[],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on initial load
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
        method: 'DELETE',
      });
      if (response.ok) {
        setItems(prevItems => ({
          ...prevItems,
          [activeType]: prevItems[activeType].filter((i: any) => i.id !== id),
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
      const index = items[activeType].findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        const newItems = [...items[activeType]] as T[];
        newItems[index] = updatedItem;
        setItems(prevItems => ({
          ...prevItems,
          [activeType]: newItems,
        }));
      }
    } else {
      setItems(prevItems => ({
        ...prevItems,
        [activeType]: [...prevItems[activeType] as T[], updatedItem],
      }));
    }
    setSelectedItem(null);
    fetchData(); // Re-fetch data to ensure UI is in sync with the file
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
        {activeType === "animal" && <AnimalForm item={selectedItem as Animal | null} onSubmitSuccess={handleFormSubmit} />}
        {activeType === "event" && <EventForm item={selectedItem as Event | null} onSubmitSuccess={handleFormSubmit} />}
        {activeType === "shop" && <ShopForm item={selectedItem as Merchandise | null} onSubmitSuccess={handleFormSubmit} />}
      </div>
    </div>
  );
}

// --------------------
// Animal Form
function AnimalForm({ item, onSubmitSuccess }: FormProps<Animal>) {
  // Updated form state to match the new Animal interface
  const [form, setForm] = useState<Omit<Animal, 'id' | 'fun_facts' | 'gallery' | 'location'> & { fun_facts: string; gallery: string; location_zone: string }>({
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
        fun_facts: item.fun_facts?.join(', ') || '',
        gallery: item.gallery?.join(', ') || '',
        location_zone: item.location.zone, // Access the nested zone property
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
        gallery: ""
      });
    }
  }, [item]);

  const zones = data.zoo_map.zones.map((z) => z.name);
  const habitats = Array.from(new Set(data.animals.map((a) => a.habitat)));
  const conservationStatuses = Array.from(new Set(data.animals.map((a) => a.conservation_status)));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index?: number) => {
    if (index !== undefined) {
      const updatedTimes = [...form.feeding_times];
      updatedTimes[index] = e.target.value;
      setForm({ ...form, feeding_times: updatedTimes });
    } else {
      const { name, value, type } = e.target;
      const finalValue = type === "number" ? Number(value) : value;
      setForm({ ...form, [name]: finalValue });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = !!item;
    const method = isEditing ? 'PUT' : 'POST';

    const payload = {
      ...form,
      id: item?.id,
      fun_facts: form.fun_facts.split(',').map(fact => fact.trim()).filter(Boolean),
      gallery: form.gallery.split(',').map(url => url.trim()).filter(Boolean),
      age: Number(form.age),
      // Construct the location object correctly for the API
      location: { zone: form.location_zone, coordinates: item?.location.coordinates || { x: 0, y: 0 } }
    };

    try {
      const response = await fetch('/api/zooliranteData', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        onSubmitSuccess(result.data.animal);
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData.error);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-bold text-xl mb-2">{item ? "Edit Animal" : "Add Animal"}</h2>
      <input name="name" value={form.name} placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="species" value={form.species} placeholder="Species" onChange={handleChange} className="border p-2 w-full" />
      <input name="scientific_name" value={form.scientific_name} placeholder="Scientific Name" onChange={handleChange} className="border p-2 w-full" />
      <select name="habitat" value={form.habitat} onChange={handleChange} className="border p-2 w-full">
        <option value="">Select Habitat</option>
        {habitats.map((h) => <option key={h} value={h}>{h}</option>)}
      </select>
      {/* Use location_zone directly from the form state */}
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
function EventForm({ item, onSubmitSuccess }: FormProps<Event>) {
  const [form, setForm] = useState<Omit<Event, 'id' | 'animals_featured'> & { animals_featured: string }>({
    title: "", description: "", date: "", start_time: "", end_time: "", location: "", category: "", animals_featured: "", capacity: 0, current_bookings: 0, ticket_required: false, additional_cost: 0, age_restriction: "", image_url: "",
  });

  useEffect(() => {
    if (item) {
      setForm({
        ...item,
        animals_featured: item.animals_featured?.join(', ') || '',
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

  const locations = Array.from(new Set(data.events.map((e) => e.location)));
  const categories = Array.from(new Set(data.events.map((e) => e.category)));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : (type === "number" ? Number(value) : value);
    setForm({ ...form, [name]: finalValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = !!item;
    const method = isEditing ? 'PUT' : 'POST';

    const payload = {
      ...form,
      id: item?.id,
      animals_featured: form.animals_featured.split(',').map(id => id.trim()).filter(Boolean),
    };

    try {
      const response = await fetch('/api/zooliranteData', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        onSubmitSuccess(result.data.event);
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData.error);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
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
function ShopForm({ item, onSubmitSuccess }: FormProps<Merchandise>) {
  const [form, setForm] = useState<Omit<Merchandise, 'id' | 'sizes' | 'colors'> & { sizes: string; colors: string }>({
    name: "", category: "", price: 0, description: "", sizes: "", colors: "", stock: 0, featured_animal: "", image_url: "",
  });

  useEffect(() => {
    if (item) {
      setForm({
        ...item,
        price: item.price || 0,
        stock: item.stock || 0,
        sizes: item.sizes?.join(', ') || '',
        colors: item.colors?.join(', ') || '',
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

  const categories = Array.from(new Set(data.merchandise.map((m) => m.category)));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === "number" ? Number(value) : value;
    setForm({ ...form, [name]: finalValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = !!item;
    const method = isEditing ? 'PUT' : 'POST';

    const payload = {
      ...form,
      id: item?.id,
      sizes: form.sizes.split(',').map(size => size.trim()).filter(Boolean),
      colors: form.colors.split(',').map(color => color.trim()).filter(Boolean),
    };

    try {
      const response = await fetch('/api/zooliranteData', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        onSubmitSuccess(result.data.merchandise);
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData.error);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
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