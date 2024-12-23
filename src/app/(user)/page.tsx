//import HomePage from './home/Home';

import HomePage from '@/components/Home';

export default function Home() {
	//return <HomePage />;
	console.log(process.env.NEXTAUTH_SECRET, process.env.NEXTAUTH_URL)
	return <HomePage />;
}
