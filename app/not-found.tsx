'use client';

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
	return (
		<html lang="en">
			<body className='text-center'>
				<h1 className='mt-10 font-semibold'>Somthing went wrong!</h1>
			</body>
		</html>
	);
};