export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-200">
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
        <div className="md:col-span-5 space-y-4 p-4 bg-white border border-gray-300 rounded-lg w-full">
            <h2 className="text-xl font-bold text-orange-500 mb-1">Login</h2>
            <p className="text-sm mb-4">Don't have an account? 
                <a href="/sign-up" className="text-blue-500"> Sign Up </a></p>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                type="email"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                type="password"
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
                    Keep me signed in </label>
            </div>
            
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600 transition-colors w-full">
                Login
            </button>
        </div>
    </div>
    </div>
)};


            
