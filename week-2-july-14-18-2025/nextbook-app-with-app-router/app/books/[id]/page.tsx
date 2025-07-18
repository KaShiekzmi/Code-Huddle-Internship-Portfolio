import { Calendar, User, Book as Hash } from 'lucide-react';
import { mockBooks, mockReviews } from '@/lib/data';
import ReviewClient from './ReviewClient';

export async function generateStaticParams() {
  return mockBooks.map((book) => ({
    id: book.id,
  }));
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const awaitedParams = await params;
  const bookId = awaitedParams.id;
  const book = mockBooks.find((b) => b.id === bookId);
  const initialReviews = mockReviews.filter((r) => r.bookId === bookId);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-gray-600">
        <div>
          <h1 className="text-3xl font-bold mb-2">Book Not Found</h1>
          <p>We couldn't find the book you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="h-80 relative">
                <img src={book.coverImage} alt={book.title} className="w-full h-full" />
              </div>
              <div className="p-6">
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  {book.genre}
                </span>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Author: {book.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Published: {book.publishedYear}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4" />
                    <span>ISBN: {book.isbn}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {book.title}
              </h1>
              <p className="text-lg text-gray-600">{book.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <ReviewClient bookId={book.id} initialReviews={initialReviews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
