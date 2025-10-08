"use client";
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Item from "@/app/components/Item";


  var count: number = 0

export function Counter(){

    return(
<div className='rounded-full bg-orange-500' style={{ width: '1.5rem', height: '1.5rem', position: 'absolute', top: 0, right: 0, transform: 'translate(25%,-25%)' }}>
                <p id="quantityText"> {count} </p>
            </div>
    )
}

interface Merchandise {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
}


interface ZooData {
  merchandise: Merchandise[];
}

export default function Cart(){
  const [open, setOpen] = useState(false);
  const [zooData, setZooData] = useState<ZooData>({ merchandise: [] });
    const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
 
  // Example cart items {id, name, price, category, description, image_url}
  // Replace this once cart functionality is added, Quanity cannot be set to zero or pricing will break. Remove items out of the array for removing items out of the cart.
  var items: string[] = [ // render
  ];

  count = items.length


  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('http://localhost:3000/api/zooliranteData', {
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

// Get unique category options
  const categoryOptions = useMemo(() => {
    const categories = Array.from(new Set(zooData.merchandise.map(merch => merch.category)));
    return ['All', ...categories];
  }, [zooData.merchandise]);

  // Filter merchandise based on search and category filter
  const filteredMerchandise = useMemo(() => {
    return zooData.merchandise.filter(merch => {
      const matchesSearch = !searchTerm || 
        merch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merch.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        merch.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'All' || merch.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [zooData.merchandise, searchTerm, categoryFilter]);

  
          const getcart = () => {
            if (typeof window !== 'undefined') {
                var cartArray = JSON.parse(localStorage.getItem('cart') || '[]')
                return cartArray
            }
        }
        const cartArrays = getcart()
        console.log(cartArrays)


    return(
            <><button
            onClick={() => setOpen(true)}
            style={{ width: "3rem", height: "3rem", position: "relative" }} className='px-2 py-1 border border-orange-500 rounded-full hover:bg-orange-600'>
            <Image
                src={"/cart.png"}
                alt="shop icon"
                width={30}
                height={30} />

            <Counter />
        </button>
        {filteredMerchandise.map((merch: Merchandise) => {
            for (var i = 0; i < cartArrays.length; i++) {
                if (cartArrays[i].key == merch.id && cartArrays[i].value > 0) {
                    items.push({ id: merch.id, name: merch.name, price: merch.price, category: merch.category, description: merch.description, image_url: merch.image_url  , quanity: cartArrays[i].value })
                    count = count + cartArrays[i].value
                }
            }
        })}
         {/* {filteredMerchandise.map((merch: Merchandise) => {
                console.log({...merch})
                    for
            })} */}
        
        
        {open && (
             <>
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
            onClick={() => setOpen(false)}
          ></div>


<div
            className={`fixed top-0 right-0 h-full w-200 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-xl"
              >
                ×
              </button>
            </div>


            <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-140px)]">
              {
              items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={item.id}
                    className=" justify-between items-center border-b pb-2"
                  >
                <Item {...item}/>
                <span>Quanity: {item.quanity}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-10">
                  Your cart is empty.
                </p>
              )}
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-0 w-full border-t p-4 bg-white">
              <div className="flex justify-between mb-3">
                <span>Total:</span>
                <span className="font-semibold">
                  $
                  {items.reduce((total, item) => total + (item.price* item.quanity) , 0).toFixed(
                    2
                  )}
                </span>
              </div>
            {/* Redirect to Cart page */}
            <Link href={`/cart/`}>
              <button
                onClick={() => console.log("checkout")} // TODO: transfer cart items to cart page here
                className="w-full text-white py-2 rounded bg-orange-400 hover:bg-orange-600"
              >
                Checkout
              </button>
            </Link>

            </div>
          </div>
          

          </>
        )}
    
        
        </>



    
    );
}