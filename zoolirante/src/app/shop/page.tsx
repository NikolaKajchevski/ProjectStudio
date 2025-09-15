
import Image from 'next/image';
import Link from 'next/link';

  const data = await fetch('http://localhost:3000/api/zooliranteData', {
    cache: 'no-store'
  });
  const zooData = await data.json(); //merchandise



export default async function Shop() {



    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className= 'grid grid-cols-3 gap-x-2 gap-y-3'>
        {zooData.merchandise.map((merch: any) => (


          <Link 
           href={`/shop/${merch.id}`}
          className="bg-white rounded-lg shadow-xl min-h-[50px] overflow-hidden">


            <div className="relative h-48">
            <Image
            
                src={merch.image_url}
                alt={merch.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div >
                <h2 className="text-black font-large" > <b> {merch.name}</b> </h2>
                <p className="text-gray-600 font-medium" >  {merch.category} </p>
                <p>Description: </p>
                <p className="text-gray-600 font-medium" >  {merch.description} </p>
                <p className="text-gray-600 font-medium" >  ${merch.price} </p>

          </Link>

        ))}
        </div>
    </div>

    );
}