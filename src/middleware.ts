import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const exceptionRoutes = ['/business-setup'];
export async function middleware(request: NextRequest) {
	const cookieStore = cookies();
	const rPath = request.nextUrl.pathname;

	const token = cookieStore.get('next-auth.session-token')?.value;
	if (exceptionRoutes.includes(rPath)) return NextResponse.next();
	else if (token && rPath.startsWith('/auth')) {
		return NextResponse.redirect(new URL('/', request.url));
	} else if (!token && !rPath.startsWith('/auth')) {
		return NextResponse.redirect(new URL('/auth/login', request.url));
	} else {
		return NextResponse.next();
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
