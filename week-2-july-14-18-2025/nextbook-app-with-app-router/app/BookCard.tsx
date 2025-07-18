import Link from 'next/link';
import { Book } from '@/lib/data';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {

  return (
    <div className="bg-white rounded-xl shadow-soft hover-lift transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="h-60 relative overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full hover:scale-105  duration-500"
        />
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
            {book.title}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">

            <span className="font-medium"><b>Written by</b> {book.author}</span>
          </div>
        </div>



        <p className="text-gray-600 text-sm mb-4 line-clamp-3 ">
          {book.description}
        </p>

        <div className="flex items-center justify-between">
          <span className=" bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            {book.genre}
          </span>
          <Link
            href={`/books/${book.id}`}
            className="text-orange-600 hover:text-orange-700 font-semibold text-sm hover:underline transition-all duration-200"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;