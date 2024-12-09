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
					...uid,
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
				const { goodToken, vendorId } = credentials as Record<string, any>;

				if (goodToken) {
					return { id: vendorId, goodToken };
				} else {
					return null;
					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
	jwt: {
		maxAge: 60 * 60 * 24,
	},
	pages: {
		signOut: '/auth/login',
	},
};

export default options;
