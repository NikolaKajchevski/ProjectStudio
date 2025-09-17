"use client";
import Link from "next/link";
import { useState } from "react";


export default function TicketConfirmationPage() {

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
       
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
        <h1 className="text-xl font-bold mb-2 text-black-500">Success! Here are your tickets:</h1>
        {/* Ticket List */}

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
                            defaultValue={0}
                            value={quantities[ticket.id] || 0}
                            onChange={e => handleQuantityChange(ticket.id, e.target.value)}
                            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors"
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>

)};


            
