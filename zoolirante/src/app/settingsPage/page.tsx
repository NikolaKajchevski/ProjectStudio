// stand in for settings page

const data = await fetch('http://localhost:3000/api/zooliranteData', {
    cache: 'no-store'
    })
    const zooData = await data.json();

export default function SettingsPage() {

    return (
        <div className="min-h-screen bg-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Two-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Left Column: Ticket cards */}
                    <div className="md:col-span-7 space-y-6">
                        <form className="md:col-span-5 space-y-4 p-4 bg-white border border-gray-300 rounded-lg w-full">
                        <h2 className="text-xl font-bold text-orange-500 mb-1">Personal Information</h2>

                        <div className="flex space-x-2">
                            <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                placeholder="First Name"
                                // value={firstName}
                                // onChange={(e) => setFirstName(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            </div>

                            <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                // value={lastName}
                                // onChange={(e) => setLastName(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            </div>
                        </div>
                        
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Favourite Animal
                                </label>
                                <select 
                                    // value={selectedAnimal}
                                    // onChange={(e) => setSelectedAnimal(e.target.value)}
                                    defaultValue=""
                                    className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >

                                    <option value="" disabled>
                                        Select an animal</option>
                                    ))
                                    {zooData.animals.map((animals: any) => (
                                        <option value={animals.id}>{animals.species}</option>
                                    ))}
                                </select>
                            </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                            </label>
                            <input
                            type="email"
                            placeholder="janedoe@example.com"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                            </label>
                            <input
                            type="password"
                            placeholder="MyStrongPass123"
                            maxLength={19}
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <input
                            type="checkbox"
                            // checked={mailingList}
                            // onChange={(e) => setMailingList(e.target.checked)}
                            className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                            />
                            <label className="text-sm text-gray-700">
                            Sign me up for the mailing list
                            </label>
                        </div>
                        
                        {/* {error && <p className="text-red-500 text-sm">{error.message}</p>} */}
                        
                        {/* <button 
                            type="submit"
                            disabled={loading}
                            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button> */}
                        </form>
                    </div>

                {/* Right Column: Payment Details */}
        
                <div className="md:col-span-5 space-y-4 p-4 bg-white border border-gray-300 rounded-lg w-full">
                        <h2 className="text-xl font-bold text-orange-500 mb-1">Add Payment Method</h2>
                    
                    <div className="flex space-x-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name <span className="text-red-500">*</span> </label>
                            <input
                            type="text"
                            placeholder="First Name"
                            // value={firstName}
                            // onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div className="flex-2 mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name <span className="text-red-500">*</span> </label>
                            <input
                            type="text"
                            placeholder="Last Name"
                            required
                            // value={lastName}
                            // onChange={(e) => setLastName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>


                <div className="flex space-x-2">
                    
                    {/* Card Number */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number <span className="text-red-500">*</span></label>
                        <input
                        type="text"
                        placeholder="1234 5678 9876 5432"
                        maxLength={19}
                        required
                        inputMode="numeric"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* CVC */}
                    <div className="w-20 mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVC <span className="text-red-500">*</span></label>
                        <input
                        type="text"
                        placeholder="123"
                        maxLength={3}
                        inputMode="numeric"
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Expiry */}
                    <div className="w-24">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry <span className="text-red-500">*</span></label>
                        <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    </div>

                    {/* Save Payment Details */}
                    <div className="flex items-center space-x-2 mb-1">
                        <input
                            type="checkbox"    
                            className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />

                        <label className="text-sm text-gray-700">
                            Save my details </label>
                    </div>
                </div>
                </div>
            </div>
            </div>
        );
}