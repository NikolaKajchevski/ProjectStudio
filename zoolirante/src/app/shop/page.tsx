
import Image from 'next/image';

  const data = await fetch('http://localhost:3000/api/zooliranteData', {
    cache: 'no-store'
  });
  const zooData = await data.json(); //merchandise



export default async function Shop() {



    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className= 'grid grid-cols-3 gap-x-2 gap-y-3'>
        {zooData.merchandise.map((merchandise: any) => (


          <div className="bg-white rounded-lg shadow-xl min-h-[50px] overflow-hidden">
            <div className="relative h-48">
            <Image
                src={merchandise.image_url}
                alt={merchandise.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div >
                <h2 className="text-black font-large" > <b> {merchandise.name}</b> </h2>
                <p className="text-gray-600 font-medium" >  {merchandise.category} </p>
                <p>Description: </p>
                <p className="text-gray-600 font-medium" >  {merchandise.description} </p>
                <p className="text-gray-600 font-medium" >  ${merchandise.price} </p>

            <div>
            <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-2 rounded-full font-medium transition-colors">
              Buy
            </button>
            </div>
          </div>

        ))}
        </div>
    </div>

    );
}