export default function AnimalsPage() {
  return (
    <div className="min-h-screen bg-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    {/* Two-column layout */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Left: Ticket cards */}
        <div className="md:col-span-7 space-y-6">
            {/* Standard Pass */}
            <div className="p-4 border border-gray-300 bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-2 text-orange-500">Standard Pass</h2>
                <p className="text-gray-600 mb-2">
                    Enjoy a one-day immersive experience during your trip to Zoolirante!
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-500">Prices from $19.99 AUD</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                        Book Now!
                    </button>
                </div>
            </div>

            {/* Child Pass */}
            <div className="p-4 border border-gray-300 bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-2 text-orange-500">Child Ticket (12 and under)</h2>
                <p className="text-gray-600 mb-2">
                    Sign up to enjoy exclusive experiences and offers!
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-500">$12.99 AUD</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">
                        Sign Up!
                    </button>
                </div>
            </div>

            {/* Concession Pass */}
            <div className="p-4 border border-gray-300 bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-2 text-orange-500">Concession Ticket</h2>
                <p className="text-gray-600 mb-2">Sign up to enjoy exclusive experiences and offers!</p>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-500">$15.99 AUD</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors">Sign Up!</button>
                </div>
            </div>
        </div>

        {/* Right: Form */}
        <div className="md:col-span-5 space-y-4 p-4 bg-white border border-gray-300 rounded-lg w-full">
            <h2 className="text-xl font-bold text-orange-500 mb-4">Your Details</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <input
                type="date"
                min={new Date().toISOString().split("T")[0]} // Cannot select a past date
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                type="email"
                placeholder="janedoe@example.com"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
            type="text"
            placeholder="1234 5678 9876"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
            />
        </div>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors w-full">
            Proceed
        </button>
      </div>
    </div>
  </div>
</div>


)};


            
