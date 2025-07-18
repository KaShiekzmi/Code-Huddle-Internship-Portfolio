import Link from 'next/link';
import { Book } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50  mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Book className="h-6 w-6 text-orange-600" />
              <span className="text-lg font-semibold text-gray-900">NextBook</span>
            </div>
            <p className="text-gray-600 text-sm">
              A simple book review application for loved one&apos;s.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase ">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-orange-600 text-sm transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-orange-600 text-sm transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-600 hover:text-orange-600 text-sm transition-colors duration-200">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase ">
              Connect
            </h3>
            <p className="text-gray-600 text-sm">
              Discover new books and share your thoughts with fellow readers.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-center text-gray-500 text-sm">
            Developed during internship at Code Huddle, Bahria Phase 4, Rawalpindi
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;