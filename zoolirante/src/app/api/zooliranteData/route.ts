import { NextRequest, NextResponse } from 'next/server';
import zooliranteData from '../../data/zooliranteData.json';
import fs from 'fs';
import path from 'path';

// TypeScript interfaces
interface Location {
  zone: string;
  coordinates: {
    x: number;
    y: number;
  };
}

interface Animal {
  id: string;
  name: string;
  species: string;
  scientific_name: string;
  habitat: string;
  age: number;
  gender: string;
  description: string;
  fun_facts: string[];
  feeding_times: string[];
  location: Location;
  conservation_status: string;
  image_url: string;
  gallery: string[];
}

interface Merchandise {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
  stock: number;
  sizes?: string[];
  colors?: string[];
  featured_animal?: string;
}


interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  category: string;
  animals_featured: string[];
  capacity: number;
  current_bookings: number;
  ticket_required: boolean;
  additional_cost: number;
  age_restriction: string;
  image_url: string;
}

interface ZooData {
  animals: Animal[];
  events: Event[],
  merchandise: Merchandise[]
}

interface AnimalPostResponse {
    animal: Animal;
}

interface EventPostResponse {
    event: Event;
}

interface MerchandisePostResponse {
    merchandise: Merchandise;
}


interface PostResponseData {
  animal: Animal;
  event: Event;
  merchandise: Merchandise;
}


interface APIResponse {
    message?: string;
    error?: string;
    animals?: Animal[];
    data?: Animal | AnimalPostResponse | EventPostResponse | MerchandisePostResponse; // This is the key change
    totalAnimals?: number;
    details?: string;
    totals?: { // You also need to add this property for the POST response
        animals: number;
        events: number;
        merchandise: number;
    }
}


// Path based on your file structure
const filePath: string = path.join(process.cwd(), 'src', 'app', 'data', 'zooliranteData.json');

export async function GET(request: NextRequest): Promise<NextResponse<APIResponse | ZooData>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id: string | null = searchParams.get('id');

    if (id) {
      // Find the specific animal
      const animal: Animal | undefined = zooliranteData.animals.find(
        (animal: Animal) => animal.id === id
      );
      
      if (!animal) {
        return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
      }

      return NextResponse.json({ animals: [animal] });
    }
    
    // If no id is provided, return all animals
    return NextResponse.json(zooliranteData as ZooData);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch zoo data' }, { status: 500 });
  }
}


export async function POST(request: NextRequest): Promise<NextResponse<APIResponse>> {
  try {
    console.log('POST request received');

    // Read the request body ONCE
    const requestBody: any = await request.json();

    console.log('New data:', requestBody);

    let existingData: ZooData = { 
      animals: [],
      events: [],
      merchandise: []
    };
    
    if (fs.existsSync(filePath)) {
      console.log('File exists, reading...');
      const fileContent: string = fs.readFileSync(filePath, 'utf-8');
      existingData = JSON.parse(fileContent) as ZooData;
      console.log('Existing data loaded');
    } else {
      console.log('File does not exist, creating new structure');
    }

    let message = 'Data added successfully';
    let addedData;

    // Check for an Animal
    if (requestBody.name && requestBody.species) {
      const completeAnimal: Animal = {
        id: requestBody.id || `animal-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: requestBody.name!,
        species: requestBody.species!,
        scientific_name: requestBody.scientific_name || requestBody.species!,
        habitat: requestBody.habitat || 'Unknown',
        age: requestBody.age || 0,
        gender: requestBody.gender || 'Unknown',
        description: requestBody.description || '',
        fun_facts: requestBody.fun_facts || [],
        feeding_times: requestBody.feeding_times || [],
        location: requestBody.location || { zone: 'General', coordinates: { x: 0, y: 0 } },
        conservation_status: requestBody.conservation_status || 'Unknown',
        image_url: requestBody.image_url || '/images/animals/default.jpg',
        gallery: requestBody.gallery || []
      };

      if (existingData.animals.find(animal => animal.id === completeAnimal.id)) {
        return NextResponse.json({ error: `Animal with ID ${completeAnimal.id} already exists` }, { status: 409 });
      }

      existingData.animals.push(completeAnimal);
      addedData = { animal: completeAnimal };
      message = 'Animal added successfully';

    // Check for an Event
    } else if (requestBody.title && requestBody.date) {
      const completeEvent: Event = {
        id: requestBody.id || `evt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: requestBody.title!,
        description: requestBody.description || '',
        date: requestBody.date!,
        start_time: requestBody.start_time || '09:00 AM',
        end_time: requestBody.end_time || '10:00 AM',
        location: requestBody.location || 'Main Area',
        category: requestBody.category || 'General',
        animals_featured: requestBody.animals_featured || [],
        capacity: requestBody.capacity || 50,
        current_bookings: requestBody.current_bookings || 0,
        ticket_required: requestBody.ticket_required !== undefined ? requestBody.ticket_required : true,
        additional_cost: requestBody.additional_cost || 0,
        age_restriction: requestBody.age_restriction || 'All ages',
        image_url: requestBody.image_url || '/images/events/default.jpg'
      };

      if (existingData.events.find(event => event.id === completeEvent.id)) {
        return NextResponse.json({ error: `Event with ID ${completeEvent.id} already exists` }, { status: 409 });
      }

      existingData.events.push(completeEvent);
      addedData = { event: completeEvent };
      message = 'Event added successfully';

    // Check for Merchandise
    } else if (requestBody.name && requestBody.price) {
      const completeMerchandise: Merchandise = {
        id: requestBody.id || `merch-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: requestBody.name!,
        category: requestBody.category || 'General',
        price: requestBody.price || 0,
        description: requestBody.description || '',
        image_url: requestBody.image_url || '/images/merchandise/default.jpg',
        stock: requestBody.stock || 0,
        sizes: requestBody.sizes || undefined,
        colors: requestBody.colors || undefined,
        featured_animal: requestBody.featured_animal || undefined
      };

      if (existingData.merchandise.find(merch => merch.id === completeMerchandise.id)) {
        return NextResponse.json({ error: `Merchandise with ID ${completeMerchandise.id} already exists` }, { status: 409 });
      }

      existingData.merchandise.push(completeMerchandise);
      addedData = { merchandise: completeMerchandise };
      message = 'Merchandise added successfully';

    } else {
      return NextResponse.json({ error: 'Invalid data format provided' }, { status: 400 });
    }

    // Write updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    console.log('Data written successfully');

    return NextResponse.json({ 
      message: message, 
      data: addedData,
      totals: {
        animals: existingData.animals.length,
        events: existingData.events.length,
        merchandise: existingData.merchandise.length
      }
    }, { status: 201 });

  } catch (error) {
    console.error('POST Error details:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      name: (error as Error).name
    });
    
    return NextResponse.json({ 
      message: 'Error adding data',
      error: (error as Error).message,
      details: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
    }, { status: 500 });
  }
}