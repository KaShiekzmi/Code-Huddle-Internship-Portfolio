import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';
import { Calendar, User, Book as Hash } from 'lucide-react';
import { Book, Review, mockBooks, mockReviews } from '../../lib/data';
import ReviewCard from '../../components/reviews/ReviewCard';
import ReviewForm from '../../components/reviews/ReviewForm';

interface BookDetailProps {
  book: Book;
  initialReviews: Review[];
}

const BookDetail = ({ book, initialReviews }: BookDetailProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const handleReviewSubmit = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="h-80 relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full "
                />
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
              <p className="text-lg text-gray-600 ">
                {book.description}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Reviews ({reviews.length})
              </h2>

              <div className="space-y-6">
                <ReviewForm bookId={book.id} onReviewSubmit={handleReviewSubmit} />

                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No reviews yet
                    </h3>
                    <p className="text-gray-600">
                      Be the first to share your thoughts about this book!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mockBooks.map((book) => ({
    params: { id: book.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const book = mockBooks.find((b) => b.id === params?.id);
  const bookReviews = mockReviews.filter((review) => review.bookId === params?.id);

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
      initialReviews: bookReviews,
    },
  };
};

export default BookDetail;