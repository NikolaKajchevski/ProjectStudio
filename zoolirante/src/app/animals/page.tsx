'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';

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
  animals: Animal[];
}

export default function AnimalsPage() {
  const [zooData, setZooData] = useState<ZooData>({ animals: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [habitatFilter, setHabitatFilter] = useState('All');
  const [speciesFilter, setSpeciesFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('http://localhost:3000/api/zooliranteData', {
          next: { revalidate: 0 },
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
    const habitats = Array.from(new Set(zooData.animals.map(animal => animal.habitat)));
    const species = Array.from(new Set(zooData.animals.map(animal => animal.species)));
    const statuses = Array.from(new Set(zooData.animals.map(animal => animal.conservation_status)));

    return {
      habitats: ['All', ...habitats],
      species: ['All', ...species],
      statuses: ['All', ...statuses]
    };
  }, [zooData.animals]);

  // Filter animals based on search and filters
  const filteredAnimals = useMemo(() => {
    return zooData.animals.filter(animal => {
      const matchesSearch = !searchTerm || 
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesHabitat = habitatFilter === 'All' || animal.habitat === habitatFilter;
      const matchesSpecies = speciesFilter === 'All' || animal.species === speciesFilter;
      const matchesStatus = statusFilter === 'All' || animal.conservation_status === statusFilter;

      return matchesSearch && matchesHabitat && matchesSpecies && matchesStatus;
    });
  }, [zooData.animals, searchTerm, habitatFilter, speciesFilter, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-light text-gray-500">Our Animals</h1>
      <br />
      
      {/* Search Bar and Filters */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search animals..."
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

          {/* Habitat Filter */}
          <div>
            <select
              value={habitatFilter}
              onChange={(e) => setHabitatFilter(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
            >
              {filterOptions.habitats.map((habitat) => (
                <option key={habitat} value={habitat}>
                  {habitat === 'All' ? 'All Habitats' : habitat}
                </option>
              ))}
            </select>
          </div>

          {/* Species Filter */}
          <div>
            <select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
            >
              {filterOptions.species.map((species) => (
                <option key={species} value={species}>
                  {species === 'All' ? 'All Species' : species}
                </option>
              ))}
            </select>
          </div>

          {/* Conservation Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
            >
              {filterOptions.statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Statuses' : status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal: any) => (
          <div key={animal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={animal.image_url}
                alt={animal.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{animal.name}</h2>
              <p className="text-gray-600 mb-2">{animal.species}</p>
              <p className="text-sm text-gray-500 mb-4">{animal.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-orange-500">
                  {animal.conservation_status}
                </span>
                <Link 
                  href={`/animals/${animal.id}`}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredAnimals.length === 0 && zooData.animals.length > 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No animals found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}