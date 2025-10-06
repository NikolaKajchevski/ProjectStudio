'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import Item from "@/app/components/Item";



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

export default function Shop() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-light text-gray-500">Shop</h1>
      <br />
      
      {/* Search Bar and Category Filter */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search merchandise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category === 'All' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

              <button style={{width: "3rem", height: "3rem", position: "relative" }} className='px-2 py-1 border border-orange-500 rounded-full hover:bg-orange-600'>
              <Image
                src={"/cart.png"}
                alt="shop icon"
                width={30}
                height={30}
              />
              <div className='rounded-full bg-orange-500' style={{width: '1.5rem', height: '1.5rem', position: 'absolute', top: 0, right: 0, transform: 'translate(25%,-25%)'}}>
                n
              </div>


            </button>
          
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMerchandise.map((merch: Merchandise) => (
          <Item {...merch}/>
        ))}
      </div>

      {/* No results message */}
      {filteredMerchandise.length === 0 && zooData.merchandise.length > 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🛍️</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No merchandise found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}