export default function AnimalsPage() {
  return (
    <div className="min-h-screen bg-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    {/* Two-column layout */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Left Column: Ticket cards */}
        {/* TODO: MIGHT CHANGE THESE TO A FOR EACH LOOP */}
        <div className="md:col-span-7 space-y-6">
            {/* Standard Pass */}
            <div className="p-4 border border-gray-300 bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-2 text-orange-500">Standard Pass</h2>
                <p className="text-gray-600 mb-2">
                    A full-day pass suitable for anyone.
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-500">$19.99 AUD</span>
                    <input
                        type="number"
                        min={0}
                        defaultValue={0}
                        className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors"
                    />
                </div>
            </div>

            {/* Child Pass */}
            <div className="p-4 border border-gray-300 bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-2 text-orange-500">Child Ticket (12 and under)</h2>
                <p className="text-gray-600 mb-2">
                    Bring the little ones along!
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-500">$9.99 AUD</span>
                    <input
                        type="number"
                        min={0}
                        defaultValue={0}
                        className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors"
                    />
                </div>
            </div>

            {/* Concession Pass */}
            <div className="p-4 border border-gray-300 bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-2 text-orange-500">Concession Ticket</h2>
                <p className="text-gray-600 mb-2">Concession card required.</p>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-500">$15.99 AUD</span>
                    <input
                        type="number"
                        min={0}
                        defaultValue={0}
                        className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors"
                    />                </div>
            </div>

            {/* Student Pass */}
            <div className="p-4 border border-gray-300 bg-white rounded-lg">
                <h2 className="text-xl font-bold mb-2 text-orange-500">Student Ticket</h2>
                <p className="text-gray-600 mb-2">Full-time student ID required.</p>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-500">$15.99 AUD</span>
                    <input
                        type="number"
                        min={0}
                        defaultValue={0}
                        className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors"
                    />                </div>
            </div>
        </div>

        {/* Right Column: Form */}
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

            <div className="flex space-x-2">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                    type="text"
                    placeholder="First Name"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                type="email"
                placeholder="janedoe@example.com"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
            />
        </div>

        <div className="flex space-x-2">
            
            {/* Card Number */}
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                type="text"
                placeholder="1234 5678 9876 5432"
                maxLength={19}
                inputMode="numeric"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* CVC */}
            <div className="w-20">
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <input
                type="text"
                placeholder="123"
                maxLength={3}
                inputMode="numeric"
                className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            {/* Expiry */}
            <div className="w-24">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                <input
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            </div>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors w-full">
            Proceed
        </button>
      </div>
    </div>
  </div>
</div>


)};


            
