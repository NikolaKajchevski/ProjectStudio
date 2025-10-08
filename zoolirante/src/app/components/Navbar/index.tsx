'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadAccountType = async () => {
      if (!user?.email) {
        setIsAdmin(false);
        return;
      }
      try {
        const res = await fetch('/api/zooliranteData');
        const data = await res.json();
        const matchedUser = Array.isArray(data?.users)
          ? data.users.find((u: any) => u.email === user.email)
          : null;
        setIsAdmin((matchedUser?.account_type || '').toLowerCase() === 'admin');
      } catch {
        setIsAdmin(false);
      }
    };
    loadAccountType();
  }, [user?.email]);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  if (loading) {
    return (
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-3">
                <Image
                  src="/zoolirante-logo.png"
                  alt="Zoolirante Logo"
                  width={60}
                  height={20}
                  priority
                />
              </div>
              <span className="text-xl font-bold text-orange-500">Zoolirante</span>
            </div>
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-3">
              <Image
                src="/zoolirante-logo.png"
                alt="Zoolirante Logo"
                width={60}
                height={20}
                priority
              />
            </div>
            <span className="text-xl font-bold text-orange-500">Zoolirante</span>
          </Link>

          {/* Nav bar that can be clicked on to go to other pages */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/animals" className="text-gray-600 hover:text-gray-900 font-medium">Animals</Link>
            <Link href="/map" className="text-gray-600 hover:text-gray-900 font-medium">Map</Link>
            <Link href="/events" className="text-gray-600 hover:text-gray-900 font-medium">Events</Link>
            <Link href="/shop" className="text-gray-600 hover:text-gray-900 font-medium">Shop</Link>
            <Link href="/membership" className="text-gray-600 hover:text-gray-900 font-medium">Membership</Link>
            <Link href="/aboutUs" className="text-gray-600 hover:text-gray-900 font-medium">About Us</Link>
            {isAdmin && (
              <Link href="/cms" className="text-gray-600 hover:text-gray-900 font-medium">CMS</Link>
            )}
          </nav>
          
          {/* Authentication-based buttons */}
          <div className="flex space-x-3 items-center">
            <Link href="/tickets">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
                Buy Tickets
              </button>
            </Link>
            
            <Link href="/membership">
              <button className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-2 rounded-full font-medium transition-colors">
                Become a Member
              </button>
            </Link>

            {user ? (
              // User is logged in - show user menu
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                    <Link href="/settingsPage" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              // User is not logged in - show login/signup buttons
              <div className="flex space-x-2">
                <Link href="/login">
                  <button className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
                    Login
                  </button>
                </Link>
                <Link href="/sign-up">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-medium transition-colors">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
