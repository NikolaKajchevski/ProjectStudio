
export default function Footer () {

    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                    <h3 className="text-lg font-bold mb-4">About Zoolirante</h3>
                    <p className="text-gray-300 text-sm mb-4">
                        We're committed to wildlife conservation and education. Visit us to learn about animals from around the world.
                    </p>
                    </div>

                    {/* Contact */}
                    <div>
                    <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                        <p>📞 (08) 1234 5678</p>
                        <p>✉️ info@zoolirante.com</p>
                        <p>📍 123 Wildlife Avenue<br/>Mawson Lakes, SA 5095</p>
                    </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2025 Zoolirante. All rights reserved. | Privacy Policy | Terms of Service</p>
                </div>
            </div>
        </footer>
    )
}