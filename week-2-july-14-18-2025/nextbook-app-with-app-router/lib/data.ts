import booksData from '../database/books.json';
import reviewsData from '../database/reviews.json';
import { Book } from '@/types/book';
import { Review } from '@/types/review';

export const mockBooks: Book[] = booksData;
export const mockReviews: Review[] = reviewsData;