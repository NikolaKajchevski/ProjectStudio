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

interface PaymentMethod {
  id: string;
  type: string;
  last_four: string;
  expiry: string;
  is_default: boolean;
}

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  account_type: string;
  member: boolean;
  favourite_animals: string[];
  saved_payment_methods: PaymentMethod[];
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
  events: Event[];
  merchandise: Merchandise[];
  users: User[];
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

interface UserPostResponse {
  user: User;
}

interface PostResponseData {
  animal: Animal;
  event: Event;
  merchandise: Merchandise;
  user: User;
}

interface APIResponse {
  message?: string;
  error?: string;
  animals?: Animal[];
  data?: Animal | AnimalPostResponse | EventPostResponse | MerchandisePostResponse | UserPostResponse;
  totalAnimals?: number;
  details?: string;
  totals?: {
    animals: number;
    events: number;
    merchandise: number;
    users: number;
  };
}

const filePath: string = path.join(process.cwd(), 'src', 'app', 'data', 'zooliranteData.json');

// GET method
export async function GET(request: NextRequest): Promise<NextResponse<APIResponse | ZooData>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id: string | null = searchParams.get('id');

    if (id) {
      const animal: Animal | undefined = zooliranteData.animals.find(
        (animal: Animal) => animal.id === id
      );
      if (!animal) {
        return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
      }
      return NextResponse.json({ animals: [animal] });
    }

    return NextResponse.json(zooliranteData as unknown as ZooData);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch zoo data' }, { status: 500 });
  }
}

// POST method
export async function POST(request: NextRequest): Promise<NextResponse<APIResponse>> {
  try {
    console.log('POST request received');
    const requestBody: any = await request.json();
    console.log('New data:', requestBody);

    let existingData: ZooData = {
      animals: [],
      events: [],
      merchandise: [],
      users: []
    };

    let rawFileContent: string = '';
    if (fs.existsSync(filePath)) {
      console.log('File exists, reading...');
      rawFileContent = fs.readFileSync(filePath, 'utf-8');
      existingData = JSON.parse(rawFileContent) as ZooData;
      console.log('Existing data loaded');
    } else {
      console.log('File does not exist, creating new structure');
    }

    let message = 'Data added successfully';
    let addedData;

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
    } else if (requestBody.email) {
      // Upsert User (create if not exists, update if exists)
      const existingIndex = existingData.users.findIndex(u => u.email === requestBody.email);
      if (existingIndex !== -1) {
        // Update existing user in memory
        const updatedUser: User = {
          // For legacy data that might not have id, generate one once
          id: (existingData.users[existingIndex] as any).id || requestBody.id || `user${String(existingData.users.length).padStart(3, '0')}`,
          email: requestBody.email,
          first_name: requestBody.first_name ?? (existingData.users[existingIndex] as any).first_name ?? '',
          last_name: requestBody.last_name ?? (existingData.users[existingIndex] as any).last_name ?? '',
          account_type: requestBody.account_type ?? (existingData.users[existingIndex] as any).account_type ?? 'Customer',
          member: requestBody.member ?? (existingData.users[existingIndex] as any).member ?? false,
          favourite_animals: requestBody.favourite_animals ?? (existingData.users[existingIndex] as any).favourite_animals ?? [],
          saved_payment_methods: requestBody.saved_payment_methods ?? (existingData.users[existingIndex] as any).saved_payment_methods ?? []
        };

        existingData.users[existingIndex] = updatedUser as any;
        addedData = { user: updatedUser } as UserPostResponse;
        message = 'User updated successfully';

        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        return NextResponse.json({
          message,
          data: addedData,
          totals: {
            animals: existingData.animals.length,
            events: existingData.events.length,
            merchandise: existingData.merchandise.length,
            users: existingData.users.length
          }
        }, { status: 200 });
      }

      // Create new user if not exists
      const completeUser: User = {
        id: requestBody.id || `user${String(existingData.users.length + 1).padStart(3, '0')}`,
        email: requestBody.email!,
        first_name: requestBody.first_name || '',
        last_name: requestBody.last_name || '',
        account_type: requestBody.account_type || 'Customer',
        member: requestBody.member ?? false,
        favourite_animals: requestBody.favourite_animals || [],
        saved_payment_methods: requestBody.saved_payment_methods || []
      };

      // Preserve file formatting by editing the users array text directly
      const contentToEdit = rawFileContent || JSON.stringify({ ...existingData, users: existingData.users }, null, 2);

      const usersKeyIndex = contentToEdit.indexOf('"users"');
      if (usersKeyIndex === -1) {
        // If users key not found, fall back to normal write (adds users with default formatting)
        existingData.users.push(completeUser);
        addedData = { user: completeUser };
        message = 'User added successfully';
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
      } else {
        const colonIndex = contentToEdit.indexOf(':', usersKeyIndex);
        const arrayStartIndex = contentToEdit.indexOf('[', colonIndex);

        // Find matching closing bracket for the users array
        let index = arrayStartIndex;
        let depth = 0;
        let arrayEndIndex = -1;
        while (index < contentToEdit.length) {
          const ch = contentToEdit[index];
          if (ch === '[') depth++;
          if (ch === ']') {
            depth--;
            if (depth === 0) {
              arrayEndIndex = index;
              break;
            }
          }
          index++;
        }

        if (arrayEndIndex === -1) {
          // Fallback if no matching end found
          existingData.users.push(completeUser);
          addedData = { user: completeUser };
          message = 'User added successfully';
          fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        } else {
          const arrayInner = contentToEdit.slice(arrayStartIndex + 1, arrayEndIndex);
          const isEmpty = arrayInner.trim().length === 0;

          // Determine indentation based on preceding whitespace before users key line
          const lineStart = contentToEdit.lastIndexOf('\n', usersKeyIndex) + 1;
          const lineIndentMatch = contentToEdit.slice(lineStart, usersKeyIndex).match(/^[\t ]*/);
          const baseIndent = lineIndentMatch ? lineIndentMatch[0] : '';
          const entryIndent = baseIndent + '  ';

          const userJson = JSON.stringify(completeUser, null, 2)
            .split('\n')
            .map((line, i) => (i === 0 ? line : entryIndent + line))
            .join('\n');

          const insertion = (isEmpty ? '\n' + entryIndent + userJson + '\n' + baseIndent : '\n' + entryIndent + ',' + userJson.replace(/^/,'') + '\n' + baseIndent);

          // If non-empty, we need to insert a comma before the new object.
          let newContent: string;
          if (isEmpty) {
            newContent = contentToEdit.slice(0, arrayStartIndex + 1) + insertion + contentToEdit.slice(arrayEndIndex);
          } else {
            // Ensure there is a comma after the last existing entry if not already present
            // Insert a comma + new entry before arrayEndIndex
            // Find last non-whitespace before arrayEndIndex
            let lastNonWs = arrayEndIndex - 1;
            while (lastNonWs > arrayStartIndex && /\s/.test(contentToEdit[lastNonWs])) lastNonWs--;
            const needsComma = contentToEdit[lastNonWs] !== ',';
            const prefix = needsComma ? contentToEdit.slice(0, lastNonWs + 1) + ',' + contentToEdit.slice(lastNonWs + 1) : contentToEdit;
            // Recompute arrayEndIndex relative to prefix length change
            const endIdx = (needsComma ? arrayEndIndex + 1 : arrayEndIndex);
            newContent = prefix.slice(0, endIdx) + insertion + prefix.slice(endIdx);
          }

          fs.writeFileSync(filePath, newContent);

          // Update in-memory counts for response without rewriting file
          existingData.users.push(completeUser);
          addedData = { user: completeUser };
          message = 'User added successfully';
          // Return early response after write handled
          return NextResponse.json({
            message: message,
            data: addedData,
            totals: {
              animals: existingData.animals.length,
              events: existingData.events.length,
              merchandise: existingData.merchandise.length,
              users: existingData.users.length
            }
          }, { status: 201 });
        }
      }
    } else {
      return NextResponse.json({ error: 'Invalid data format provided' }, { status: 400 });
    }

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    console.log('Data written successfully');

    return NextResponse.json({
      message: message,
      data: addedData,
      totals: {
        animals: existingData.animals.length,
        events: existingData.events.length,
        merchandise: existingData.merchandise.length,
        users: existingData.users.length
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

// PUT method
export async function PUT(request: NextRequest): Promise<NextResponse<APIResponse>> {
  try {
    const requestBody: any = await request.json();
    const { id, ...updatedData } = requestBody;

    if (!id) {
      return NextResponse.json({ error: 'ID is required to update an item.' }, { status: 400 });
    }

    let existingData: ZooData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    let updatedItem: Animal | Event | Merchandise | undefined;
    let message = '';
    let found = false;
    let responseData: AnimalPostResponse | EventPostResponse | MerchandisePostResponse | undefined;

    // Check for an Animal update
    if (updatedData.species || (updatedData.name && existingData.animals.some(a => a.id === id))) {
      const index = existingData.animals.findIndex(animal => animal.id === id);
      if (index !== -1) {
        existingData.animals[index] = { ...existingData.animals[index], ...updatedData };
        updatedItem = existingData.animals[index];
        message = 'Animal updated successfully';
        found = true;
        responseData = { animal: updatedItem as Animal };
      }
    }

    // Check for an Event update
    if (!found && updatedData.title) {
      const index = existingData.events.findIndex(event => event.id === id);
      if (index !== -1) {
        existingData.events[index] = { ...existingData.events[index], ...updatedData };
        updatedItem = existingData.events[index];
        message = 'Event updated successfully';
        found = true;
        responseData = { event: updatedItem as Event };
      }
    }

    // Check for Merchandise update
    if (!found && updatedData.price) {
      const index = existingData.merchandise.findIndex(merch => merch.id === id);
      if (index !== -1) {
        existingData.merchandise[index] = { ...existingData.merchandise[index], ...updatedData };
        updatedItem = existingData.merchandise[index];
        message = 'Merchandise updated successfully';
        found = true;
        responseData = { merchandise: updatedItem as Merchandise };
      }
    }
    // Check if id exisits 
    if (!found) {
      return NextResponse.json({ error: `Item with ID ${id} not found.` }, { status: 404 });
    }

    //Write to JSON
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json({
      message,
      data: responseData
    }, { status: 200 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update data', details: (error as Error).message }, { status: 500 });
  }
}

// DELETE method
export async function DELETE(request: NextRequest): Promise<NextResponse<APIResponse>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const type = searchParams.get('type');

    if (!id || !type) {
      return NextResponse.json({ error: 'Both "id" and "type" query parameters are required for deletion.' }, { status: 400 });
    }

    let existingData: ZooData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    let initialCount = 0;
    let newCount = 0;
    let message = '';

    switch (type) {
      case 'animal':
        initialCount = existingData.animals.length;
        existingData.animals = existingData.animals.filter(animal => animal.id !== id);
        newCount = existingData.animals.length;
        message = `Animal with ID ${id} deleted successfully.`;
        break;
      case 'event':
        initialCount = existingData.events.length;
        existingData.events = existingData.events.filter(event => event.id !== id);
        newCount = existingData.events.length;
        message = `Event with ID ${id} deleted successfully.`;
        break;
      case 'merchandise':
        initialCount = existingData.merchandise.length;
        existingData.merchandise = existingData.merchandise.filter(merch => merch.id !== id);
        newCount = existingData.merchandise.length;
        message = `Merchandise with ID ${id} deleted successfully.`;
        break;
      default:
        return NextResponse.json({ error: 'Invalid "type" parameter. Must be "animal", "event", or "merchandise".' }, { status: 400 });
    }

    if (initialCount === newCount) {
      return NextResponse.json({ error: `Item with ID ${id} and type "${type}" not found.` }, { status: 404 });
    }

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete data', details: (error as Error).message }, { status: 500 });
  }
}