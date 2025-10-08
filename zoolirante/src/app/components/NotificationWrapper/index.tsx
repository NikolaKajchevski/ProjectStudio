'use client';

import { useEffect, useState } from 'react';
import NotificationSystem from '../NotificationSystem';

interface User {
  email: string;
  first_name: string;
  favourite_animals: string[];
  member: boolean;
  membership_type: string;
  membership_start_date: string;
  upcoming_visits: Array<{
    date: string;
    ticket_type: string;
    booking_id: string;
  }>;
}

interface Animal {
  name: string;
  species: string;
}

export default function NotificationWrapper() {
  const [user, setUser] = useState<User | null>(null);
  const [animals, setAnimals] = useState<Record<string, Animal>>({});
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch the JSON data from your existing API route
        const response = await fetch('/api/zooliranteData');
        
        // Check if response is ok
        if (!response.ok) {
          console.error('API response not OK:', response.status, response.statusText);
          setIsLoading(false);
          return;
        }

        // Check content type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('Response is not JSON. Content-Type:', contentType);
          const text = await response.text();
          console.error('Response text:', text.substring(0, 200));
          setIsLoading(false);
          return;
        }

        const zooData = await response.json();

        // Get current user from your auth system
        const getCurrentUser = (): User | null => {
          // Option 1: From localStorage (if you store session there)
          const storedUser = localStorage.getItem('currentUser');
          if (storedUser) {
            return JSON.parse(storedUser);
          }

        // Option 2: Mock user for testing with data from your JSON
        // Find the user from zooData
        const mockUser = zooData.users?.find((u: any) => u.email === 'nkajchev@gmail.com');

        if (mockUser) {
        // Calculate date 7 days from today
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
        const futureDate = sevenDaysFromNow.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        
        return {
            email: mockUser.email,
            first_name: mockUser.first_name,
            favourite_animals: mockUser.favourite_animals || [],
            member: mockUser.member || false,
            membership_type: "Individual",
            membership_start_date: "2025-09-08",
            // Add mock upcoming visit for 7 days away to test notifications
            upcoming_visits: [
            { date: futureDate, ticket_type: "Adult", booking_id: "BK12345" }
            ]
        };
        }

        return null;
        };

        // Process animals data
        const animalMap: Record<string, Animal> = {};
        zooData.animals?.forEach((animal: any) => {
          animalMap[animal.id] = {
            name: animal.name,
            species: animal.species
          };
        });

        setUser(getCurrentUser());
        setAnimals(animalMap);
        setEvents(zooData.events || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading zoo data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NotificationSystem 
      user={user}
      animals={animals}
      events={events}
    />
  );
}