import Image from "next/image";
import Button from "./components/Button";
import { ImageSlider } from "./components/ImageSlider";



const IMAGES = ['/zoolirante-logo.png', '/window.svg', '/file.svg', '/images/merchandise/marco-plush.jpg']

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-200">
    
      {/* Continue from here to add anything else */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light text-gray-500">Zoolirante Homepage</h1>
        <div className = "slider">
          <div className="slides">



            <main>
             <h1 className="text-3xl font-light text-gray-500">Merchandising</h1>

              <div className="next bg-orange-300" style={{width: '100%', height: '400px', display: "flex"}}>
                <div style = {{width: '36%', height: '90%', marginLeft: '5%', marginTop: '20px'}}>
                  <ImageSlider imageUrls={IMAGES}/>
                </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden"  style = {{width: '50%', height: '100%', marginLeft:'auto',   float: 'left' }} >
                <div style = {{width: '80%', height: '50%'}} >
                  <div className="p-4" style={{ float: 'right', textAlign: "right"}}>
                     <h2 className="text-xl font-bold mb-2">name</h2>
                      <p className="text-gray-600 mb-2">description</p>
                  </div>
                </div>
                <div style = {{width: '80%', height: '50%'}}  >
                <button className="bg-orange-500 text-white px-20 py-3 rounded-full text-sm hover:bg-orange-600 transition-colors" style = {{ marginLeft:'50%', marginTop: '25%', textAlign: "center"}}>
                  Shop Now!
                </button>
                </div>
              </div>
              
              </div>


            </main>
            </div>
        </div>

      </div>
    </div>
  );
}
