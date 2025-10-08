'use client'
import { useState, useEffect, useMemo } from 'react';
export default async function Cart() {
    const data = await fetch('http://localhost:3000/api/zooliranteData', {
        cache: 'no-store',
        mode: 'no-cors'
    });
    const zooData = await data.json();
    if (typeof window !== 'undefined') {
        const cartArrays = JSON.parse(localStorage.getItem('cart') || '[]')
        return (
        <div className="min-h-screen bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Left Column: Ticket cards */}
            <div className="md:col-span-7 space-y-6">

                {/* Standard Pass */}
                <div className="p-4 border border-gray-300 bg-white rounded-lg">
                    <h2 className="text-xl font-bold mb-2 text-orange-500">Items in Cart</h2>
                    <div>
                        {zooData.merchandise.map((merch: any) => {
                            for (var i = 0; i < cartArrays.length; i++) { 
                                if (cartArrays[i].key == merch.id && cartArrays[i].value > 0) {
                                    return (
                                        <p>hi</p>
                                    )
                                }                            
                            }
                        })}
                    </div>  

                </div>
            </div>

            {/* Right Column: Form */}
            <div className="md:col-span-5 space-y-4 p-4 bg-white border border-gray-300 rounded-lg w-full">
                <form>
                <h2 className="text-xl font-bold text-orange-500 mb-4">Your Details</h2>

                <div className="flex space-x-2 mb-4">
                    <div className="flex-1 mb-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name <span className="text-red-500">*</span> </label>
                        <input
                        type="text"
                        placeholder="First Name"
                        required
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
        )
    }
}   
