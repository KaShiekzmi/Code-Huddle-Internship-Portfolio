'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Send } from 'lucide-react';
import { Review } from '@/types/review';
interface ReviewFormProps {
  bookId: string;
  onReviewSubmit: (review: Review) => void;
}

const ReviewForm = ({ bookId, onReviewSubmit }: ReviewFormProps) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const validateForm = () => {
    if (!comment.trim()) {
      setHasError(true);
      return false;
    }

    setHasError(false);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!session) return;

    setIsSubmitting(true);

    const newReview: Review = {
      id: Date.now().toString(),
      bookId,
      userId: session.user?.email || '',
      userName: session.user?.name || '',
      comment: comment.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      onReviewSubmit(newReview);
      setComment('');
      setHasError(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
        <p className="text-gray-600">Please sign in to write a review.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-soft border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Write a Review</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Comment *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (hasError) {
                setHasError(false);
              }
            }}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-colors duration-200 ${hasError ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Write a review about this book..."
          />
          {hasError && (
            <p className="text-red-500 text-sm mt-1">Please write a comment</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold"
        >
          <Send className="h-4 w-4" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;