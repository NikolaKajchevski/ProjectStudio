export default function AnimalsPage() {
  return (
    <div className="min-h-screen bg-gray-200">
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
        {/* Purchase Tickets Card */}
        <div className="p-4 border border-gray-300 bg-[#f8ecd2] rounded-lg">
            <h2 className="text-xl font-bold mb-2">One-Day Pass</h2>
            <p className="text-gray-600 mb-2">Enjoy a one-day immersive experience during your trip to Zoolirante!</p>
            <p className="text text-gray-600 mb-4">
                <br></br>
                <li>
                   <b>Full-Day Access:</b>  Visit on a selected date of your choice!
                </li>
                <br></br>
                <li>
                    <b>Guided Tours:</b> Meet and get to know our animals with the help of our friendly Zoolirante Zoo-Keepers
                </li>
                <br></br>
                <li>
                    <b>Special Events:</b> Simply book your ticket for one of our eligible event days including Animal Feedings, Interactive Sessions and more. Explore our events page to find out more!
                </li>
            </p>
                
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-orange-500">
                </span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                Book Now!
                </button>
            </div> 
        </div>
        
        {/* Membership card */}
        <div className="p-4 border border-gray-300 bg-[#f8ecd2] rounded-lg">
            <h2 className="text-xl font-bold mb-2">animal.name</h2>
            <p className="text-gray-600 mb-2">animal.species</p>
            <p className="text-sm text-gray-500 mb-4">animal.description</p>
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-orange-500">
                animal.conservation_status
                </span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                Sign up!
                </button>
            </div>  
        </div>

    </div>
    </div>
    </div>


)};


            
