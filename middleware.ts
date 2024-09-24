import { withAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from './navigation';

const publicPages = [
	'/',
	'/signup',
	'/login',
	'/about',
	'/prices',
	'/questions',
	'/services'
];

const intlMiddleware = createMiddleware({
	locales,
	defaultLocale: 'ua'
});

const authMiddleware = withAuth(
	(req) => {
		console.log('PatchName', req.nextUrl.pathname);
		console.log('Midlsession', req.nextauth.token?.user_role);
		if (
			req.nextUrl.pathname.startsWith('/dashboard') &&
			req.nextauth.token?.user_role !== 'admin'
		) {
			return NextResponse.rewrite(new URL('/private-route', req.url));
		}
		return intlMiddleware(req);
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
);

export default function middleware(req: NextRequest) {
	const publicPathnameRegex = new RegExp(
		`^(/(${locales.join('|')}))?(${publicPages
			.flatMap((p) => (p === '/' ? ['', '/'] : p))
			.join('|')})/?$`,
		'i'
	);
	const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

	if (isPublicPage) {
		return intlMiddleware(req);
	} else {
		return (authMiddleware as any)(req);
	}
}

export const config = {
	matcher: [
		// "/((?!login|api|_next/static|_next/image|favicon.ico).*)",
		// "/sms-sender/:path*",
		// '/',
		// '/(ua|en)/:path*',
		// '/((?!api|_next/static|_next/image|favicon.ico).*)',
		'/((?!api|_next|svg|.*\\..*).*)',
		// '/(ua|en)/user/:path*',
		// '/dashboard/:path*',
		// '/(ua|en)/create-group/:path*',
		// '/(ua|en)/update-group/:path*',
		// '/(ua|en)/sending-history/:path*',
		// '/admin/:path*',
		// '/api/admin/:path*',
		// '/api/alfa-name/:path*',
		// '/api/clients/:path*',
		// '/api/reseller/get-balance/:path*',
		// '/api/reseller/send-sms/:path*',
		// '/api/sending-groups/:path*',
		// '/api/sending-history/:path*',
		// '/api/sending-history/refresh-statuses/:path*',
		// '/api/users/logout/:path*',
	],
};

// import { withAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';

// export default withAuth(
// 	function middleware(req) {
// 		console.log('PatchName', req.nextUrl.pathname);
// 		console.log('Midlsession', req.nextauth.token?.user_role);
// 		if (
// 			req.nextUrl.pathname.startsWith('/dashboard') &&
// 			req.nextauth.token?.user_role !== 'admin'
// 		) {
// 			return NextResponse.rewrite(new URL('/private-route', req.url));
// 		}
// 	},
// 	{
// 		callbacks: {
// 			authorized: ({ token }) => !!token,
// 		},
// 	}
// );

// export const config = {
// 	matcher: [
// 		// "/((?!login|api|_next/static|_next/image|favicon.ico).*)",
// 		// "/sms-sender/:path*",
// 		'/dashboard/:path*',
// 		'/create-group/:path*',
// 		'/update-group/:path*',
// 		'/sending-history/:path*',
// 		'/user/:path*',
// 		'/admin/:path*',
// 		'/api/admin/:path*',
// 		'/api/alfa-name/:path*',
// 		'/api/clients/:path*',
// 		'/api/reseller/get-balance/:path*',
// 		'/api/reseller/send-sms/:path*',
// 		'/api/sending-groups/:path*',
// 		'/api/sending-history/:path*',
// 		'/api/sending-history/refresh-statuses/:path*',
// 		'/api/users/logout/:path*',
// 	],
// };
