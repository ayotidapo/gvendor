import React from 'react'
import './Spinner.css'

const Spinner = ({
	fullScreen = true,
}: {
	fullScreen?: boolean
}) => {
	return (
		<div
			className={`${fullScreen ? 'h-screen' : 'h-60'
				} flex items-center justify-center text-primary`}
		>
			<div className="lds-spinner">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Spinner
