"use client";
import { useState } from "react";

export default function TicketBooking() {

    const GST = 0.10;

    const tickets = [
        {id: "standard", name: "Standard Pass", price: 19.99, description: "A full-day pass suitable for anyone."},
        {id: "child", name: "Child Ticket (12 and under)", price: 12.99, description: "Bring the little ones along!"},
        {id: "concession", name: "Concession Ticket", price: 15.99, description: "Concession card required."},
        {id: "student", name: "Student Ticket", price: 15.99, description: "Student card required."}
    ];

    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    const handleQuantityChange = (id: string, value: string) => {
        setQuantities(prev => ({
        ...prev,
        [id]: Math.max(0, Number(value)) // avoid negative numbers
        }));
    };

    const totalCost = tickets.reduce(
        (sum, ticket) => sum + (quantities[ticket.id] || 0) * ticket.price, 0
    );

    const totalCostIncludingGST = totalCost + (totalCost * GST);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [ticketError, setTicketError] = useState("");

    const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Must have at least one ticket selected
        const ticketQuantity = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
        if (ticketQuantity === 0) {
            setTicketError("Please select at least one ticket.");
            return;
        }

        const booking = {
            name: `${firstName} ${lastName}`,
            date: selectedDate,
            tickets: tickets.map(ticket => ({
            id: ticket.id,
            name: ticket.name,
            quantity: quantities[ticket.id] || 0,
            price: ticket.price
            })).filter(t => t.quantity > 0),
            subtotal: totalCost,
            gst: totalCost * GST,
            total: totalCostIncludingGST,
        };

        localStorage.setItem("latestBooking", JSON.stringify(booking));
        window.location.href = "/tickets/confirmation";
    };
       
  return (
    <div className="min-h-screen bg-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    {/* Two-column layout */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Left Column: Ticket cards */}
        <div className="md:col-span-7 space-y-6">

            {tickets.map(ticket => (
                <div key={ticket.id} className="p-4 border border-gray-300 bg-white rounded-lg">
                    <h2 className="text-xl font-bold mb-2 text-orange-500">{ticket.name}</h2>
                    <p className="text-gray-600 mb-2">{ticket.description}</p>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-orange-500">${ticket.price} AUD</span>
                        <input
                            type="number"
                            min={0}
                            value={quantities[ticket.id] || 0}
                            onChange={e => handleQuantityChange(ticket.id, e.target.value)}
                            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors"
                        />
                    </div>
                </div>
            ))}
        </div>

        {/* Right Column: Form */}
        
        <div className="md:col-span-5 space-y-4 p-4 bg-white border border-gray-300 rounded-lg w-full">
            <form onSubmit={handleConfirm}>
            
            <h2 className="text-xl font-bold text-orange-500 mb-4">Your Details</h2>
        
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date <span className="text-red-500">*</span> </label>
                <input
                type="date"
                min={new Date().toISOString().split("T")[0]} // Cannot select a past date
                value={selectedDate}
                required
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
                />
            </div>

            <div className="flex space-x-2">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span> </label>
                    <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div className="flex-2 mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span> </label>
                    <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span> </label>
                <input
                type="email"
                placeholder="janedoe@example.com"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
            />
        </div>

        <div className="flex space-x-2">
            
            {/* Card Number */}
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number <span className="text-red-500">*</span></label>
                <input
                type="text"
                placeholder="1234 5678 9876 5432"
                maxLength={19}
                required
                inputMode="numeric"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* CVC */}
            <div className="w-20 mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC <span className="text-red-500">*</span></label>
                <input
                type="text"
                placeholder="123"
                maxLength={3}
                inputMode="numeric"
                required
                className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* Expiry */}
            <div className="w-24">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry <span className="text-red-500">*</span></label>
                <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                required
                className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            </div>

            {/* Save Payment Details */}
            <div className="flex items-center space-x-2 mb-1">
                <input
                    type="checkbox"    
                    className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />

                <label className="text-sm text-gray-700">
                    Save my details </label>
            </div>

            {/* Order Summary */}
            <div className="space-y-1">

                <h2 className="font-bold">Order Summary</h2>

                {tickets.map(ticket => {
                    const qty = quantities[ticket.id] || 0;
                    if (qty === 0) return null;
                    return (
                        <div key={ticket.id} className="flex justify-between">
                        <span>{qty}x {ticket.name}</span>
                        <span>${(ticket.price * qty).toFixed(2)} AUD</span>
                        </div>
                    );
                })}
            
                <div className="flex justify-between">
                    <span>GST</span>
                    <span>${(totalCost * GST).toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold">
                    <span>Total Cost</span>
                    <span>${totalCostIncludingGST.toFixed(2)} AUD</span>
                </div>
            </div>

        {/* No ticket selected */}
        {ticketError && (
            <p className="text-red-500 text-sm mb-2">{ticketError}</p>
        )}

        <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors w-full">
            Confirm
        </button>
        </form>
      </div>
    </div>
  </div>
</div>
)};