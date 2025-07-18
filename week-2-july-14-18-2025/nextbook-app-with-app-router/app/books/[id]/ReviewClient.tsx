'use client';

import { useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import { Review } from '@/lib/data';

export default function ReviewClient({
    bookId,
    initialReviews,
}: {
    bookId: string;
    initialReviews: Review[];
}) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);

    const handleReviewSubmit = (newReview: Review) => {
        setReviews([newReview, ...reviews]);
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Reviews ({reviews.length})
            </h2>

            <div className="space-y-6">
                <ReviewForm bookId={bookId} onReviewSubmit={handleReviewSubmit} />

                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
                        <p className="text-gray-600">
                            Be the first to share your thoughts about this book!
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
