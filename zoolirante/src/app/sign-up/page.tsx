export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-200">
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
        <div className="md:col-span-5 space-y-4 p-4 bg-white border border-gray-300 rounded-lg w-full">
            <h2 className="text-xl font-bold text-orange-500 mb-1">Sign Up</h2>
            <p className="text-sm mb-4">Already have an account? 
                <a href="/login" className="text-blue-500"> Login </a></p>

            <div className="flex space-x-2">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span> </label>
                    <input
                    type="text"
                    placeholder="First Name"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span> </label>
                    <input
                    type="text"
                    placeholder="Last Name"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span> </label>
                <input
                type="email"
                required
                placeholder="janedoe@example.com"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span> </label>
                <input
                type="password"
                required
                placeholder="MyStrongPass123"
                maxLength={19}
                    
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>
            
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"    
                    className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />

                <label className="text-sm text-gray-700">
                    Sign me up for the mailing list </label>
            </div>
            
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors w-full">
                Sign Up
            </button>
        </div>
    </div>
    </div>
)};


            
