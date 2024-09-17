import { AuthHeader } from "@/components/typography/AuthHeader";
import { Gilroy } from "@/fonts/font";
import { useAppSelector } from "@/hooks/reduxHooks";
import { authSelector } from "@/redux/reducers/auth/auth.selector";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const Wrapper = ({ children, title }: { children: ReactNode; title: string; }) => {
	const router = useRouter();
	const authData = useAppSelector(authSelector);

	useEffect(() => {
		if (authData.signedIn) {
			router.push('/');
		}
	}, [authData.signedIn]);

	return (
		<div
			className={`
              ${Gilroy.variable} h-screen
              overflow-hidden lg:flex justify-center items-center
          `}
		>
			<div
				className='
                  w-[100%] lg:w-[50%]
                  p-4
                  md:flex md:justify-center lg:justify-end
                  lg:px-24 lg:pb-0
                  max-h-full
                  overflow-y-scroll hide-scroll-bar
                  '
			>
				<div className='md:max-w-[500px] w-[100%]'>
					<AuthHeader title={title} className='text-center mb-10' />
					{children}
				</div>
			</div>
			<div
				className={`
                  w-[100%] lg:w-[50%]
                  lg:block hidden
                  min-h-[100vh]
                  bg-[url('/assets/login-bg.svg')]
                  bg-no-repeat
                  bg-cover
              `}
			></div>
		</div>
	);
};


export default Wrapper
