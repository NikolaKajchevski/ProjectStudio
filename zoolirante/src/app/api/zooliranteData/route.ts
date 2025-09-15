import { NextRequest, NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next'
import zooliranteData from '../../data/zooliranteData.json';
import fsPromises from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {

    
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    console.log('test')


    if (id) {
      
    console.log(id)
      // Find the specific animal
      const animal = zooliranteData.animals.find(animal => animal.id === id);
      
      if (!animal) {
        return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
      }

      return NextResponse.json({ animals: [animal] });
    }


      if (id) {
      const merch = zooliranteData.merchandise.find(merch => merch.id === id);
      
      if (!merch) {
        return NextResponse.json({ error: 'Merchandise not found' }, { status: 404 });
      }

      return NextResponse.json({ merchandise: [merch] });
    }

    // Copy the method above if you need to query data using a different varible

    

    // If no id is provided, return all animals
    return NextResponse.json(zooliranteData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch zoo data' }, { status: 500 });
  }
}

// export async function POST(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//     try {
//     const data = req.body
//     const jsonData = await fsPromises.readFile("../../data/zooliranteData");
//     const objectData = JSON.parse(jsonData.toString());
    
//     const { first, second  } = data;
    
//     const newData = {
//       first,
//       second
//     } 

//     objectData.push(newData);

//     const updatedData = JSON.stringify(objectData);
//     await fsPromises.writeFile("../../data/zooliranteData", updatedData);
//     res.status(200).json({message: 'stored data'})
//   } catch(error) {
//     res.status(500).json({message: 'Error storing'})
//   }
// }

