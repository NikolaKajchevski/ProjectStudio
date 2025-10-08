"use client";
import { useState } from "react";

import Item from "@/app/components/Item";


export default function Cart() {
    const GST: number = 0.10;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    

    var totalCost: number = 0
    var totalCostIncludingGST: number = totalCost + (totalCost*GST)
 const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
 }




  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-light text-gray-500">Shopping Cart</h1>
    </div>
    <div  style={{height:'200px'}}>
    <div className=" space-y-4 p-4  bg-white border border-gray-300 rounded-lg" style={{width:'50%', float: 'left'}}>
        <form onSubmit={handleConfirm}>

          <h2 className="text-xl font-bold text-orange-500 mb-4">Your Details</h2>


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
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
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
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span> </label>
            <input
              type="email"
              placeholder="janedoe@example.com"
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300" />
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
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
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
                className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500" />
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
                className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>

          {/* Save Payment Details */}
          <div className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />

            <label className="text-sm text-gray-700">
              Save my details </label>
          </div>

          {/* Order Summary */}
          <div className="space-y-1">

            <h2 className="font-bold">Order Summary</h2>


            <div className="flex justify-between">
              <span>GST</span>
              <span>${(totalCost * GST).toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold">
              <span>Total Cost</span>
              <span>${totalCostIncludingGST.toFixed(2)} AUD</span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors w-full">
            Confirm
          </button>
        </form>
      </div>
    <div className="space-y-4 p-4 py-20 bg-white border border-gray-300 rounded-lg" style={{width:'50%', float:'right'}}>
    <div>
      <h1 className="text-3xl font-light text-gray-500">No items in cart</h1>
      <div><h1 className="text-3xl mt-5 font-light text-gray-500">$ 0.00 AUD</h1></div> 

    </div>
    
    </div>

      </div>
    </div>

  );
}