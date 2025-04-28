// src/pages/404Page.jsx
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-base text-gray-500">
          It might have been moved or deleted. Let's help you find your way back.
        </p>

        {/* Image */}
        <div className="mt-8">
          <img src="/404-error-animate.svg" alt="404 error illustration" className="w-full h-64 object-contain mx-auto" />
        </div>

        

        <div className="mt-6">
          <Link to="/" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
