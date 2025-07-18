import BookCard from './BookCard';
import { Book } from '@/types/book';
interface BookGridProps {
  books: Book[];
}

const BookGrid = ({ books }: BookGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;