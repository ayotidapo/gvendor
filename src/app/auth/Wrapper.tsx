const Wrapper = ({}) => {
	

	return (
		<div
			className={`
              h-screen
              overflow-hidden lg:flex justify-center items-center
          `}
		>
			<div
				className='
                  w-[100%] lg:w-[50%]
                  p-4
                  md:flex md:justify-center lg:justify-end
                  lg:px-24 lg:pb-0
                  max-h-full pt-40 lg:pt-0
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
                  lg:flex hidden
                  min-h-[100vh]
									justify-center items-center
              `}
			>
				<div className=' w-[500px] h-[600px] relative'>
					<Image
						src={BGIMG}
						layout='fill'
						objectFit='cover'
						alt='bg image'
						className='rounded-xl'
					/>
				</div>
			</div>
		</div>
	);
};

export default Wrapper;
