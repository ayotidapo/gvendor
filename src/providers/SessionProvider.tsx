'use client';

import { SessionProvider as NextAuthProvider } from 'next-auth/react';
interface Props {
	children: React.ReactNode;
}
const SessionProvider = ({ children }: Props) => {
	return <NextAuthProvider>{children}</NextAuthProvider>;
};

export default SessionProvider;
