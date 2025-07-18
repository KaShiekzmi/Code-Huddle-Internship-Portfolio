'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Menu, X, Book, LogIn, LogOut } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isAuthenticated = status === 'authenticated';

  return (
    <header className="bg-white shadow border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <Book className="h-8 w-8 text-[#FD4605] group-hover:scale-110 transition-transform duration-200" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">NextBook</h1>
                <p className="text-xs text-gray-500">A simple book review app</p>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
            >
              About
            </Link>

            {isAuthenticated && (
              <Link
                href="/profile"
                className="text-gray-700 hover:text-orange-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Profile
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full relative overflow-hidden">
                    <Image
                      src={session?.user?.image || '/default-avatar.png'}
                      alt={session?.user?.name || 'User avatar'}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <span className="text-sm text-gray-700">
                    {session?.user?.name}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : status === 'unauthenticated' ? (
              <button
                onClick={() => signIn('google')}
                className="cursor-pointer flex items-center space-x-1 bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors duration-200"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            ) : null}
          </nav>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              {isAuthenticated && (
                <Link
                  href="/profile"
                  className="block text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              )}

              <div className="border-t border-gray-200 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <div className="w-8 h-8 rounded-full relative overflow-hidden">
                        <Image
                          src={session?.user?.image || '/default-avatar.png'}
                          alt={session?.user?.name || 'User avatar'}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <span className="text-base text-gray-700">
                        {session?.user?.name}
                      </span>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="cursor-pointer w-full text-left text-gray-700 hover:text-orange-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : status === 'unauthenticated' ? (
                  <button
                    onClick={() => signIn('google')}
                    className="w-full text-left bg-orange-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700 transition-colors duration-200"
                  >
                    Sign In with Google
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;