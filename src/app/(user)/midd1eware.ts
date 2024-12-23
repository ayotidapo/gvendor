import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	// Get session
	// const session = await getServerSession(NextAuthOptions);

	//if (!session) {

	return NextResponse.redirect(new URL('/auth/login', request.url));
	//}

	// Proceed with request
	//return NextResponse.next();
}

export const config = {
	matcher: ['/user/*', '/(user)/*'],
};
