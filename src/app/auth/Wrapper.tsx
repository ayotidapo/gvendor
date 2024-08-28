import { Gilroy } from "@/fonts/font";
import { ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
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
