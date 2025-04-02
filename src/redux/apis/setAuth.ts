import { signIn } from 'next-auth/react';
interface Props {
	goodToken: string;
	vendorId?: string;
	[key: string]: any;
}
export const signInUser = async (payload: Props) => {
	try {
		const response = await signIn('credentials', {
			...payload,
		});

		return response; // Can be null or error depending on the flow
	} catch (error) {
		throw error;
	}
};
