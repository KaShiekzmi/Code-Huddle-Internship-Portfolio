import booksData from '../database/books.json';
import reviewsData from '../database/reviews.json';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genre: string;
  publishedYear: number;
  isbn: string;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt: string;
}

export const mockBooks: Book[] = booksData;
export const mockReviews: Review[] = reviewsData;