"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Ticket {
    id: string;
    name: string;
    quantity: number;
}

interface Booking {
    name: string;
    date: string;
    tickets: Ticket[];
}

export default function TicketConfirmationPage() {
    
    const [booking, setBooking] = useState<Booking | null>(null);

    useEffect(() => {
        const storedBooking = localStorage.getItem("latestBooking");
        
        if (storedBooking) {
            setBooking(JSON.parse(storedBooking));
        }}, []);
        
        // No booking found
        if (!booking) {
            return (
            <div className="min-h-screen flex flex-col items-center pt-16 space-y-4">
                <p className="text-black">No booking found.</p>
                <Link href="/tickets/book">
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                        Book Now!
                    </button>
                </Link>
            </div>
            );
        }

       // Format date in MM / DD / YYYY
        const dateBooked = new Date(booking.date).toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
        <h1 className="text-xl font-bold mb-2 text-black-500">Success! Here are your tickets:</h1>
        <div className="md:col-span-7 space-y-6">

            {/* Ticket Details */}
            {booking.tickets.map((ticket) => (

            <div key={ticket.id} className="p-4 border border-gray-300 bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-2 text-orange-500">{ticket.quantity}x {ticket.name}</h2>
                <p className="text-gray-600 mb-2">{booking.name}</p>
                <p className="text-gray-600 mb-2">Your visit is scheduled for {dateBooked}</p>       
            </div>
            ))}
        </div>
    </div>
)};
