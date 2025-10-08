import Image from 'next/image';
import Link from 'next/link';

type ItemProps = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
}


export default function Item({id, name, price, category, description, image_url}: ItemProps){
return(  <Link 
            key={id}
            href={`/shop/${id}`}
            className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={image_url}
                alt={name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold text-black mb-2">{name}</h2>
              <p className="text-orange-500 font-medium mb-4">{category}</p>
              <div className="mb-4">
                <p className="text-black font-medium mb-1">Description:</p>
                <p className="text-black text-sm">{description}</p>
              </div>
              <p className="text-green-900 font-bold text-lg">${price}</p>
            </div>
          </Link>);}
    
