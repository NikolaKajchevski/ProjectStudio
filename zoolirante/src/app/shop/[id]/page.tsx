
import Image from "next/image";
import data from "../../data/zooliranteData.json";
import ImageSlider from "@/app/components/ImageSlider";

export default function MerchDetailsPage({ params }: { params: { id: string } }) {
        {/* Main Image */}
            const merchandise = data.merchandise.find(a => a.id === params.id);
            if (!merchandise) {
                return <p className="text-center text-red-500 mt-10">Item not found.</p>;
            }

              return (
    <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-15">
            <div className="relative w-full h-400 rounded-lg overflow-hidden shadow-lg bg-white">
                  
                <div className="relative rounded-lg overflow-hidden shadow-lg bg-black" style={{float: 'left', maxHeight: '1200px' , maxWidth:'1900px' , width: '56.25%' , height: '56.25%', marginLeft: '10%', marginTop: '10%'}}>
                  <ImageSlider
                imageUrls={[merchandise.image_url]} // Todo: add additonal images in database {[merchandise.image_url, merchandise.image_url2]}
               // alt={merchandise.name}
               // fill
                //style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className=" rounded-lg bg-orange-500" style={{float: 'right', marginRight: '5%', width: '23.75%', height: '56.25%', marginTop: '10%'}}>
                  <div className="bg-orange-400" style={{height:'50%'}}>
                    <h1 className="text-[4rem] text-center font-bold" >{merchandise.name}</h1>
                    <p className="mt-5 text-center text-[2.5rem">{merchandise.description}</p>
                  </div>

                  <div className="relative" > 
                    <p className="ml-20 mt-10 text-[1.5rem]">{merchandise.category}</p>
                    <p className="ml-20 mt-0 text-[1.5rem]">${merchandise.price}</p>
                      <button  className=" mt-15 bg-orange-400 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors" style={{float: 'right', marginRight: '33%', alignContent: 'center'}} > {/*Todo: link to cart page */}
                       <Image
                      src={"/cart.png"}
                      alt="shop icon"
                      width={50}
                      height={50}
                      style={{ objectFit: 'cover', float: 'left', marginLeft: '0%' }}
                      />
                       <p className="ml-5 text-center text-[2.5rem]" style={{float:'right'}}>Order</p>
                     </button>

                    <p className="ml-20 mt-65 text-[1rem]">*Shipping not avaliable, pickup only</p>
                    <p className="ml-20 mt-0 text-[1rem]">Shop Code: {merchandise.id}</p>

                  </div>
                </div>
            </div>
      </div>
      );
}

