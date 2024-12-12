import NextAuthOptions from '@/utils/nextAuthOptions';
import NextAuth from 'next-auth';

const handler = NextAuth(NextAuthOptions);
export { handler as GET, handler as POST };
