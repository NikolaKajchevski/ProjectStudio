'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  age_restriction: string;
  description: string;
  image_url: string;
  animals_featured: string[];
}

interface Animal {
  id: string;
  name: string;
  species: string;
  habitat: string;
  description: string;
  conservation_status: string;
  image_url: string;
}

interface ZooData {
  events: Event[];
  animals: Animal[];
}

export default function EventsPage() {
  const [zooData, setZooData] = useState<ZooData>({ events: [], animals: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');


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

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const categories = Array.from(new Set(zooData.events.map(event => event.category)));
    const locations = Array.from(new Set(zooData.events.map(event => event.location)));

    return {
      categories: ['All', ...categories],
      locations: ['All', ...locations]
    };
  }, [zooData.events]);

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    return zooData.events.filter(event => {
      const matchesSearch = !searchTerm || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;
      const matchesLocation = locationFilter === 'All' || event.location === locationFilter;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [zooData.events, searchTerm, categoryFilter, locationFilter]);

  return (
    <div className="min-h-screen">
      <section className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center text-white" 
             style={{backgroundImage: "url('https://images4.alphacoders.com/783/783592.jpg')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Events</h1>
          <p className="text-xl mb-6">
            View and Sign-Up for current and upcoming events at Zoolirante!
          </p>
        </div>
      </section>
      
      <section className="py-14 bg-orange-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Zoolirante's Events!</h2>
          <p className="text-gray-600 text-lg">
            Come join us at Zoolirante for exciting experiences within the zoo! There's a plethora of available events each tailored towards giving you a thrilling adventure.
          </p>
        </div>
      </section>
      
      <div className="mx-auto">
        <div className="bg-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl text-black-500 text-center font-bold mb-8">Current Events</h1>
            
            {/* Search Bar and Filters */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
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
                    {filterOptions.categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'All' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  >
                    {filterOptions.locations.map((location) => (
                      <option key={location} value={location}>
                        {location === 'All' ? 'All Locations' : location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mx-auto lg:px-4 py-3">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-7">
              {filteredEvents.map((events: Event) => (
                <div key={events.id} className="h-100 w-300 bg-orange-50 rounded-lg shadow-md overflow-hidden border border-gray-300 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mx-auto">
                  <div className="py-10 mx-auto"> 
                    <img className="relative h-80 w-120" style={{ objectFit: 'cover'}} src={events.image_url} alt={events.title}></img>
                  </div>
                  <div className="p-4 py-15 mx-auto">
                    <div className="flex justify-between items-center"> 
                        <h2 className="text-3xl font-bold mb-2">
                          {events.title}
                        </h2>
                        <h2 className="border border-orange-500 font-bold text-orange-500 px-3 py-1 rounded-full text-sm">
                          {events.category}
                        </h2>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600 font-bold mb-2">
                        {events.date} | {events.start_time} - {events.end_time}
                      </p>
                      <p className="border border-orange-500 font-bold text-orange-500 px-2 py-1 rounded-full text-sm hover:bg-orange-600 transition-colors">
                        {events.age_restriction}
                      </p>
                    </div>
                    <p className="text-gray-600 font-bold mb-2">
                      {events.location}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      {events.description}
                    </p>
                    <h2 className="font-bold text-gray-600 font-bold">
                      Featured Animals
                    </h2>
                    <div className="py-3 grid grid-cols-4 mb-3">
                      {events.animals_featured.map((Element: string) => {
                          for (var i = 0; i < zooData.animals.length; i++) {
                            if (zooData.animals[i].id == Element) {
                              return (
                                      <Link
                                        key={zooData.animals[i].id} 
                                        href={`/animals/${zooData.animals[i].id}`}
                                        className="text-center border border-orange-500 font-bold text-orange-500 px-2 py-1 rounded-full text-sm hover:bg-orange-600 transition-colors"
                                      >
                                        {zooData.animals[i].name}
                                      </Link>
                              )
                            }
                          }
                      })}
                    </div>
                    <Link href="/tickets/book">
                      <button className="bg-orange-500 font-bold text-white px-5 py-3 rounded-full text-sm hover:bg-orange-600 transition-colors">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>  
              ))}
            </div>

            {/* No results message */}
            {filteredEvents.length === 0 && zooData.events.length > 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📅</div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No events found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}