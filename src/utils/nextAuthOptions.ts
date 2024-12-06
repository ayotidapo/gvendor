import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

type TokenJWT = JWT & { uid: Record<string, any> };

const options: NextAuthOptions = {
	callbacks: {
		async session({ session, token }) {
			const uid = (token as TokenJWT)?.uid;
			const modifiedSession = {
				...session,
				user: {
					...session.user,
					efikoToken: uid?.efikoToken,
					userId: token?.sub,
					role: uid?.role,
				},
			};

			return modifiedSession;
		},
		jwt: async ({ token, user }) => {
			if (user) {
				token.uid = user; // everything is here including id
			}

			return token;
		},
	},

	providers: [
		CredentialsProvider({
			credentials: {},
			async authorize(credentials, req) {
				const { isLoggedIn, id, email, efikoToken, role } =
					credentials as Record<string, any>;

				if (isLoggedIn) {
					return { id, email, efikoToken, role };
				} else {
					return null;
					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
	// pages: {
	//   signOut: '/student/4',
	// },
};

export default options;
