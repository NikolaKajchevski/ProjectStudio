"use client";
import { useState } from "react";

export default function MembershipPage() {
    const membershipPrice = 70;
    const GST = membershipPrice * 0.10;

    const membershipStartDate = new Date();

    const membershipEndDate = new Date(membershipStartDate);
    membershipEndDate.setFullYear(membershipStartDate.getFullYear() + 1); // This day next year

    // Format both dates in MM / DD / YYYY
    const membershipStartDateFormatted = membershipStartDate.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    });

    const membershipEndDateFormatted = membershipEndDate.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    });    

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const membership = {
            name: `${firstName} ${lastName}`
        };

        localStorage.setItem("latestBooking", JSON.stringify(membership));
        window.location.href = "/membership/confirmation";
    };

  return (
    <div className="min-h-screen bg-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    {/* Two-column layout */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Left Column: Ticket cards */}
        <div className="md:col-span-7 space-y-6">

            {/* Standard Pass */}
            <div className="p-4 border border-gray-300 bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-2 text-orange-500">Membership</h2>
                <p className="text-gray-600 mb-2">
                    Be king of the jungle by becoming a member!
                </p>
                <p className="text text-gray-600 mb-4">
                <br></br>
                <li>
                   <b>Full-Day Access:</b>  Visit on a selected date of your choice!
                </li>
                <br></br>
                <li>
                    <b>Guided Tours:</b> Meet and get to know our animals with the help of our friendly Zoolirante Zoo-Keepers
                </li>
                <br></br>
                <li>
                    <b>Special Events:</b> Explore our events page to find out more!
                </li>
            </p>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-500">${membershipPrice} AUD / Year</span>
                </div>
            </div>
        </div>

        {/* Right Column: Form */}
        <div className="md:col-span-5 space-y-4 p-4 bg-white border border-gray-300 rounded-lg w-full">
            <form onSubmit={handleConfirm}>
            <h2 className="text-xl font-bold text-orange-500 mb-4">Your Details</h2>

            <div className="flex space-x-2 mb-4">
                <div className="flex-1 mb-1">
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

                <div className="flex-1 mb-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span></label>
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
                required
                placeholder="janedoe@example.com"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
            />
            </div>

        <div className="flex space-x-2 mb-4">
            
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
            <div className="w-20">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC <span className="text-red-500">*</span></label>
                <input
                type="text"
                placeholder="123"
                maxLength={3}
                required
                inputMode="numeric"
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
                required
                maxLength={5}
                className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            </div>

            {/* Save Payment Details */}
            <div className="flex items-center space-x-2 mb-4">
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

                <div className="flex justify-between">
                    <span>Membership Dates</span>
                    <span>{membershipStartDateFormatted} - {membershipEndDateFormatted}</span>
                </div>

                <div className="flex justify-between">
                    <span>1 Year Zoolirante Membership</span>
                    <span>${membershipPrice} AUD</span>
                </div>
            
                <div className="flex justify-between">
                    <span>GST</span>
                    <span>${GST} AUD</span>
                </div>
                
                <div className="flex justify-between font-bold">
                    <span>Total Cost</span>
                    <span>${membershipPrice + GST} AUD</span>
                </div>
            </div>

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


            
