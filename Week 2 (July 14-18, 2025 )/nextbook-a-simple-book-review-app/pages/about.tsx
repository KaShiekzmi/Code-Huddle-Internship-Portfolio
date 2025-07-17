import { GetStaticProps } from 'next';
import Link from 'next/link';

const About = () => {

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About NextBook
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
              Your gateway to discovering, reviewing, and sharing amazing books with a community of passionate readers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              NextBook was created with a simple mission: to make discovering and sharing great books easier and more enjoyable. We believe that reading is one of life's greatest pleasures, and we want to help you find your next favorite book.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Whether you're looking for the latest bestseller, a classic novel, or a hidden gem in your favorite genre, NextBook provides a clean, intuitive platform to explore, review, and discuss books with fellow readers.
            </p>
            <p className="text-lg text-gray-600">
              Built with modern web technologies including Next.js, TypeScript, and Tailwind CSS, NextBook delivers a fast, responsive, and beautiful reading experience across all devices.
            </p>
          </div>

          <div className="bg-orange-600 rounded-lg p-8 text-white">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">1,000+</div>
                <div className="text-sm text-orange-100">Books</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">5,000+</div>
                <div className="text-sm text-orange-100">Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm text-orange-100">Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">4.5</div>
                <div className="text-sm text-orange-100">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of readers who have already discovered their next favorite book on NextBook.
          </p>
          <Link
            href="/"
            className="bg-orange-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-700 transition-colors duration-200 "
          >
            Explore Books Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default About;