'use client';

import { useSession } from 'next-auth/react';
import { User, Mail, Calendar } from 'lucide-react';

const Profile = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-6">
              <img
                src={session.user?.image || ''}
                alt={session.user?.name || ''}
                className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {session.user?.name}
            </h1>
            <p className="text-lg text-orange-100 mb-4">
              {session.user?.email}
            </p>
            <div className="flex items-center justify-center space-x-2 text-orange-100">
              <Calendar className="h-4 w-4" />
              <span>Member since January, 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Account Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Full Name</p>
                    <p className="text-sm text-gray-600">{session.user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{session.user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Member Since</p>
                    <p className="text-sm text-gray-600">January 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Favorite Genres</h2>
              <div className="flex flex-wrap gap-2">
                {['Fiction', 'Mystery', 'Science Fiction', 'Romance', 'Biography'].map((genre) => (
                  <span
                    key={genre}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;