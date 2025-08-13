import Link from 'next/link';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">404 Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <p className="text-lg">Please check the URL or go back to the <Link href="/" className="text-blue-600 hover:text-blue-800">homepage</Link>.</p>
    </div>
  );
}

export default NotFoundPage;