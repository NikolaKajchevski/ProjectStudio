import Image from 'next/image';

export default async function AnimalsPage() {
  const data = await fetch('http://localhost:3000/api/zooliranteData', {
    cache: 'no-store'
  });
  const zooData = await data.json();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-light text-gray-500">Our Animals</h1>
      <br></br>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zooData.animals.map((animal: any) => (
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
                <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}