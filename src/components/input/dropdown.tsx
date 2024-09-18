import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, ReactNode } from 'react'
import React from 'react'
import { LoadingOval } from '../spinner/Spinner'
import { PRIMARY_COLOR } from '../../constants'

const Dropdown = ({
	menuItems,
	menuButton,
	customMenuItems = undefined,
	onClickMenuItem,
	position = 'right',
	widthClass = 'w-56',
	className = '',
	closeOnClick = true,
	menuClassName = '',
	loading = false,
}: {
	menuButton: ReactNode | string
	onClickMenuItem?: (item: { name: string | ReactNode; value: string }) => void
	menuItems?: { name: string | ReactNode; value: string }[]
	customMenuItems?: ReactNode
	position?: string
	widthClass?: string
	className?: string
	closeOnClick?: boolean
	menuClassName?: string
	loading?: boolean
}) => {
	return (
		<Menu as="div" className={`relative inline-block text-left ${className}`}>
			<MenuButton
				as={'a'}
				className={
					'cursor-pointer hover:scale-[0.98] transition-all duration-300'
				}
				onClick={(e) => {
					e.stopPropagation()
				}}
			>
				{menuButton}
			</MenuButton>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<MenuItems
					className={clsx(
						`absolute
                ${widthClass}
                z-[999] mt-2
                overflow-y-scroll
                overflow-x-hidden bg-white
                border border-divider-gray
                origin-top-right
                rounded-md shadow-lg
                focus:outline-none
                hide-scroll-bar
                ${menuClassName}
                `,
						{
							'left-0 right-0': position === 'center',
							'right-0': position === 'right',
							'left-0': position === 'left',
						},
					)}
				>
					{loading && (
						<div className="py-8 flex items-center justify-center">
							<LoadingOval
								color={PRIMARY_COLOR}
								loaderHeight="25"
								loaderWidth="25"
							/>
						</div>
					)}

					{!loading && customMenuItems !== undefined
						? customMenuItems
						: undefined}

					{!loading && !customMenuItems
						? menuItems?.map((item, index) => {
							const key = `menu-item-${index}`
							return (
								<MenuItem key={key}>
									{({ focus }) => (
										<button
											type="button"
											className={clsx(
												'w-full',
												focus && 'bg-primary/5 text-black',
												'block px-4 py-2 text-sm text-left',
											)}
											onClick={(e) => {
												if (!closeOnClick) {
													e.preventDefault();
												}
												if (onClickMenuItem) {
													onClickMenuItem(item);
												}
											}}
										>
											{item.name}
										</button>
									)}
								</MenuItem>
							)
						})
						: undefined}
				</MenuItems>
			</Transition>
		</Menu>
	)
}

export default Dropdown
