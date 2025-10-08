'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import Item from "@/app/components/Item";
import Cart from "@/app/components/ShoppingCart";



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

    const deleteCart = (id: string) => {
      var cartArray = JSON.parse(localStorage.getItem('cart') || '[]')
      for (var i = 0; i < cartArray.length; i++) {
        if (cartArray[i].key == id) {
          if (cartArray[i].value > 0) {
            cartArray[i].value = cartArray[i].value - 1
            if (cartArray[i].value == 0) {
              cartArray[i] == ''
            }
          }
        }
      }
      localStorage.setItem('cart', JSON.stringify(cartArray))
    }

    const addCart = (id: string) => {
        var cartArray = JSON.parse(localStorage.getItem('cart') || '[]')
        var cartCheck = []
        var item = {key: id, value: 1};
        for (var i = 0; i < cartArray.length; i++) {
          if (cartArray[i] == null) {
            cartArray[i] == ''
          }
          else {
            cartCheck.push(cartArray[i].key)
            if (cartArray[i].key == id) {
                cartArray[i].value = cartArray[i].value + 1
            }
          }
        }
        if (!cartCheck.includes(id)) {
            cartArray.push(item)
        }
        localStorage.setItem('cart', JSON.stringify(cartArray))
        console.log(cartArray[1].value)
        console.log(cartCheck)
        console.log('test') 

    }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-light text-gray-500">Shop</h1>
      <br />
      <div style={{float:'right', marginLeft:'1rem'}}>
              <button style={{width: "3rem", height: "3rem", position: "relative" }} className='px-2 py-1 border border-orange-500 rounded-full hover:bg-orange-600'>
              <Image
                src={"/cart.png"}
                alt="shop icon"
                width={30}
                height={30}
              />

              
            <Cart/>
            </button>
      </div>


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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMerchandise.map((merch: Merchandise) => (
          <div key={merch.id} className='bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow'>
          <Item {...merch}/>
          <button
          className="text-center border border-orange-500 font-bold text-orange-500 px-2 py-1 rounded-full text-sm hover:bg-orange-600 transition-colors"
          onClick={(e: React.FormEvent) => {
            addCart(merch.id)
          }}
          >
            Add To Cart
          </button>
          <button
          className="text-center border border-orange-500 font-bold text-orange-500 px-2 py-1 rounded-full text-sm hover:bg-orange-600 transition-colors"
          onClick={(e: React.FormEvent) => {
            deleteCart(merch.id)
          }}
          >
            Remove From Cart
          </button>
          </div>

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