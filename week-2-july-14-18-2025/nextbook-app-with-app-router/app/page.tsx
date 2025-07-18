import { Book } from 'lucide-react';
import BookGrid from './BookGrid';

async function getBooks() {
  try {
    const res = await fetch(`http://localhost:3000/api/books`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`Failed to fetch books: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return data.books || [];
  } catch (error) {
    console.error('Failed to fetch books:', error);
    return [];
  }
}

export default async function Home() {
  const books = await getBooks();
  const featuredGenres = ['Fantasy', 'Classic Fiction', 'Horror', 'Dystopian Fiction'];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-orange-600 text-white relative overflow-hidden">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-yellow-300 font-semibold">Welcome to NextBook</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your Next
              <span className="block text-yellow-300">Great Read</span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Join thousands of book lovers sharing reviews, discovering hidden gems, and building their perfect reading list
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {featuredGenres.map((genre) => (
                <span
                  key={genre}
                  className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 hover:bg-white/30 transition-all duration-200 cursor-pointer"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Books
              </h2>
              <p className="text-gray-600">Discover amazing stories from our curated collection</p>
            </div>
          </div>

          {books.length > 0 ? (
            <BookGrid books={books} />
          ) : (
            <div className="text-center py-16">
              <Book className="h-20 w-20 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No books found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
