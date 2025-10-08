"use client";

import { useEffect, useMemo, useState } from "react";

export default function SettingsPage() {
  const [animals, setAnimals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [savedMethods, setSavedMethods] = useState<any[]>([]);

  // Payment form state
  const [pmFirstName, setPmFirstName] = useState("");
  const [pmLastName, setPmLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [savePaymentDetails, setSavePaymentDetails] = useState(false);
  const [savingPayment, setSavingPayment] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/zooliranteData", { cache: "no-store" });
        const data = await res.json();
        if (!active) return;
        setAnimals(data.animals || []);
        const user = (data.users && data.users[0]) || null;
        if (user) {
          setFirstName(user.first_name || "");
          setLastName(user.last_name || "");
          setEmail(user.email || "");
          setSelectedAnimal((user.favourite_animals && user.favourite_animals[0]) || "");
          setSavedMethods(user.saved_payment_methods || []);
        }
        setError(null);
      } catch (e: any) {
        setError("Failed to load settings");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      const body = {
        email,
        first_name: firstName,
        last_name: lastName,
        favourite_animals: selectedAnimal ? [selectedAnimal] : [],
      };
      const res = await fetch("/api/zooliranteData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to save settings");
      }
    } catch (e: any) {
      setError(e.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSavePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingPayment(true);
      setError(null);

      if (!email) {
        throw new Error("No user email loaded");
      }

      if (!savePaymentDetails) {
        return;
      }

      const sanitizedNumber = cardNumber.replace(/\s+/g, "");
      if (sanitizedNumber.length < 4) {
        throw new Error("Invalid card number");
      }
      const lastFour = sanitizedNumber.slice(-4);
      const newMethod = {
        id: `pm_${Date.now()}`,
        type: "card",
        last_four: lastFour,
        expiry,
        is_default: true,
      };

      const body = {
        email,
        saved_payment_methods: [...savedMethods, newMethod],
      };

      const res = await fetch("/api/zooliranteData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Failed to save payment method");
      }

      setSavedMethods((prev) => [...prev, newMethod]);
      // Clear sensitive inputs locally
      setCardNumber("");
      setCvc("");
    } catch (e: any) {
      setError(e.message || "Failed to save payment method");
    } finally {
      setSavingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 space-y-6">
            <form onSubmit={handleSave} className="md:col-span-5 space-y-4 p-4 bg-white border border-gray-300 rounded-lg w-full">
              <h2 className="text-xl font-bold text-orange-500 mb-1">Personal Information</h2>

              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Favourite Animal</label>
                <select
                  value={selectedAnimal}
                  onChange={(e) => setSelectedAnimal(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select an animal</option>
                  {animals.map((a: any) => (
                    <option key={a.id} value={a.id}>{a.species}</option>
                  ))}
                </select>
              </div>


              <div className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                <label className="text-sm text-gray-700">Sign me up for the mailing list</label>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading || saving || !email}
                className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </form>
          </div>

          <form onSubmit={handleSavePayment} className="md:col-span-5 space-y-4 p-4 bg-white border border-gray-300 rounded-lg w-full">
            <h2 className="text-xl font-bold text-orange-500 mb-1">Add Payment Method</h2>

            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span>{" "}</label>
                <input type="text" placeholder="First Name" value={pmFirstName} onChange={(e) => setPmFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              <div className="flex-2 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span>{" "}</label>
                <input type="text" placeholder="Last Name" required value={pmLastName} onChange={(e) => setPmLastName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number <span className="text-red-500">*</span></label>
                <input type="text" placeholder="1234 5678 9876 5432" maxLength={19} required inputMode="numeric" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              <div className="w-20 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC <span className="text-red-500">*</span></label>
                <input type="text" placeholder="123" maxLength={3} inputMode="numeric" required value={cvc} onChange={(e) => setCvc(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>

              <div className="w-24">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry <span className="text-red-500">*</span></label>
                <input type="text" placeholder="MM/YY" maxLength={5} required value={expiry} onChange={(e) => setExpiry(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-1">
              <input type="checkbox" className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" checked={savePaymentDetails} onChange={(e) => setSavePaymentDetails(e.target.checked)} />
              <label className="text-sm text-gray-700">Save my details </label>
            </div>
            <button type="submit" disabled={savingPayment || !email} className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed">
              {savingPayment ? "Saving..." : "Save Payment Method"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
