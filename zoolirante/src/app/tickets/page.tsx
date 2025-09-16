import Link from "next/link";

export default function TicketPage() {
  return (
    <div className="min-h-screen bg-gray-200">
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
        {/* Purchase Tickets Card */}
        <div className="p-4 border border-gray-300 bg-white rounded-lg">
            <h2 className="text-xl font-bold mb-2 text-orange-500">One-Day Pass</h2>
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
                    <b>Special Events:</b> Explore our events page to find out more!
                </li>
            </p>
                
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-orange-500">
                    Prices from $19.99 AUD
                </span>
                
                <Link href="/tickets/book">
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                        Book Now!
                    </button>
                </Link>
                
            </div> 
        </div>
        
        {/* Membership card */}
        <div className="p-4 border border-gray-300 bg-white rounded-lg">
            <h2 className="text-xl font-bold mb-2 text-orange-500">Become a Member!</h2>
            <p className="text-gray-600 mb-2">Sign up to enjoy exlusive experiences and offers!</p>
            <p className="text text-gray-600 mb-4">
                <br></br>
                <li>
                   <b>Full-Year Access:</b> Visit any time, any day!
                </li>
                <br></br>
                <li>
                    <b>Discounted Goods:</b> Enjoy our Zoolirante merch at a discounted price
                </li>
                <br></br>
                <li>
                    <b>Skip the Queue:</b> Our VIBs (Very Important Bees) don't need to wait in line to see what the buzz is about!
                </li>
            </p>
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-orange-500">
                    For just $70 AUD, enjoy a year's worth of benefits
                </span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                Sign Up!
                </button>
            </div>  
        </div>

    </div>
    </div>
    </div>


)};


            
