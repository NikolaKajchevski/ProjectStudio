import { NextRequest, NextResponse } from 'next/server';
import zooliranteData from '../../data/zooliranteData.json';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      // Find the specific animal
      const animal = zooliranteData.animals.find(animal => animal.id === id);
      
      if (!animal) {
        return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
      }

      return NextResponse.json({ animals: [animal] });
    }


    // Copy the method above if you need to query data using a different varible

    

    // If no id is provided, return all animals
    return NextResponse.json(zooliranteData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch zoo data' }, { status: 500 });
  }
}
