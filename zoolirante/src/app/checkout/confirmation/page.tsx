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

export default function confirmation() {
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
    return(
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
            <h1 className="text-xl font-bold mb-2 text-black-500">Success! Here's a summary of your order:</h1>
            <div className="md:col-span-7 space-y-6">

                {/* Ticket Details */}
                {zooData.merchandise.map((merch:any) => {
                    for (var i = 0; i < cartArrays.length; i++) {
                        if (cartArrays[i].key == merch.id && cartArrays[i].value > 0) {
                            return (
                                <div key={merch.id} className="p-4 border border-gray-300 bg-white rounded-lg grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mx-auto">
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
                {/* {booking.tickets.map((ticket) => (

                <div key={ticket.id} className="p-4 border border-gray-300 bg-white rounded-lg">
                    <h2 className="text-xl font-bold mb-2 text-orange-500">{ticket.quantity}x {ticket.name}</h2>
                    <p className="text-gray-600 mb-2">{booking.name}</p>
                    <p className="text-gray-600 mb-2">Your visit is scheduled for {dateBooked}</p>       
                </div> */}
            </div>
        </div>
    )
}
{/* <div>
    {zooData.merchandise.map((merch: any) => {
        for (var i = 0; i < cartArrays.length; i++) { 
            if (cartArrays[i].key == merch.id && cartArrays[i].value > 0) {
                console.log('hi')
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
</div>  */}