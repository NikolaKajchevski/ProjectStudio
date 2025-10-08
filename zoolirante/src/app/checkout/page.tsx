'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';

interface Merchandise {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
}

interface ZooData {
  merchandise: Merchandise[];
}
export default function checkout() {
  const [zooData, setZooData] = useState<ZooData>({ merchandise: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
 

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('http://localhost:3000/api/zooliranteData', {
          cache: 'no-store'
        });
        const zooDataResponse = await data.json();
        setZooData(zooDataResponse);
      } catch (error) {
        console.error('Failed to fetch zoo data:', error);
      }
    };
    fetchData();
  }, []);

  // Get unique category options
  const categoryOptions = useMemo(() => {
    const categories = Array.from(new Set(zooData.merchandise.map(merch => merch.category)));
    return ['All', ...categories];
  }, [zooData.merchandise]);

  // Filter merchandise based on search and category filter
  const filteredMerchandise = useMemo(() => {
    return zooData.merchandise.filter(merch => {
      const matchesSearch = !searchTerm || 
        merch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merch.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merch.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'All' || merch.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [zooData.merchandise, searchTerm, categoryFilter]);
        const getcart = () => {
            if (typeof window !== 'undefined') {
                var cartArray = JSON.parse(localStorage.getItem('cart') || '[]')
                return cartArray
            }
        }
        const cartArrays = getcart()
        var cost = 0;
        console.log(cartArrays)
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
                                    cost = (merch.price * cartArrays[i].value) + cost
                                    return (
                                        <div key={merch.id} className="bg-orange-50 rounded-lg shadow-md overflow-hidden border border-gray-300 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mx-auto">
                                            <div className="py-10 mx-auto"> 
                                                <img className="relative h-50 w-50" style={{ objectFit: 'cover'}} src={merch.image_url} alt={merch.title}></img>
                                            </div>
                                            <div className="p-10 py-15 mx-auto">
                                                <div className="flex justify-between items-center"> 
                                                    <h2 className="text-3xl font-bold mb-2">
                                                    {merch.name}
                                                    </h2>
                                                </div>
                                                <h2 className="border border-orange-500 font-bold text-orange-500 px-3 py-1 rounded-full text-sm text-center">
                                                ${merch.price}, Quantity: x{cartArrays[i].value}
                                                </h2>                                                                                                
                                            </div> 
                                        </div>                                       
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
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Date of Visit <span className="text-red-500">*</span> </label>
                    <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]} // Cannot select a past date
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
                    />
                </div>                
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
                    {zooData.merchandise.map((merch: any) => {
                        for (var i = 0; i < cartArrays.length; i++) { 
                            if (cartArrays[i].key == merch.id && cartArrays[i].value > 0) {
                                var total = merch.price * cartArrays[i].value
                                return (
                                    <div key={merch.id}>
                                        <h1 className="font-bold mb-2">
                                        {merch.name}
                                        </h1>
                                        <h2 className="font-bold mb-2">
                                        ${total}, Quantity: x{cartArrays[i].value}
                                        </h2>                                                                                                
                                    </div>                                       
                                )
                            }                            
                        }
                    })}
                    <h2 className="font-bold">Total: ${cost}</h2>
                </div>

            <Link href="/checkout/confirmation">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors w-full">
                Confirm
                </button>
            </Link>
            </form>
            
        </div>
        </div>
    </div>
    </div>
    )
}   
