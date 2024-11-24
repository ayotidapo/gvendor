import React from 'react';
import './tnc.scss';
import Checkbox from '@/atoms/Checkbox';
import { SimpleBtn } from '@/atoms/buttons/Button';

const TnC = () => {
	return (
		<div className='tnc mx-auto w-[75%] pt-5'>
			<h2 className='auth_h2'>Welcome to Good for creators!</h2>
			<p>
				Kindly read the information below to understand how Good operates and
				what to expect.
			</p>
			<article className='my-8'>
				<h3 className='t_'>The kind of items we expect from our creators</h3>
				<p>
					On Good, you get to showcase your best work to a community that values
					quality and uniqueness. Our platform connects trusted creators with
					customers seeking top-quality items, all in one curated space.
				</p>
			</article>
			<article className='my-8'>
				<h3 className='t_'>The kind of items we expect from our creators</h3>
				<p>
					At Good, we expect our creators to showcase top-quality items that
					reflect their unique style and craftsmanship. Before your items can be
					sold on our platform, they will be reviewed to ensure they meet our
					standards of quality and uniqueness. This process helps us curate an
					exceptional collection that resonates with our community.
				</p>
			</article>
			<article className='my-8'>
				<h3 className='t_'>The kind of items we expect from our creators</h3>
				<p>
					At Good, we take a 20% commission on every item sold on our platform.
					This fee helps us maintain a high-quality marketplace and provides you
					with essential support services, including marketing, customer
					service, and a secure transaction process.
				</p>
			</article>
			<article className='my-8'>
				<h3 className='t_'>The kind of items we expect from our creators</h3>
				<p>
					On Good, you get to showcase your best work to a community that values
					quality and uniqueness. Our platform connects trusted creators with
					customers seeking top-quality items, all in one curated space.
				</p>
			</article>

			<article className='my-8'>
				<h3 className='t_'>Additional Information</h3>
				<ul className='tnc_list'>
					<li>
						<div>
							<span className='text-black subpixel-antialiased '>
								Settlements:&nbsp;
							</span>
							Creators will receive payments for their sales immediately after
							an order has been fulfilled, deposited directly into the bank
							account they provide.
						</div>
					</li>
					<li>
						<div>
							<span className='text-black subpixel-antialiased '>
								Curated Lists:&nbsp;
							</span>
							Good curates collections from various creators, called "lists,"
							making it easier for customers to find the items they need.
						</div>
					</li>
					<li>
						<div>
							<span className='text-black subpixel-antialiased '>
								Delivery Support:&nbsp;
							</span>
							Delivery riders will be available to assist creators in delivering
							orders directly to customers.
						</div>
					</li>
					<li>
						<div>
							<span className='text-black subpixel-antialiased '>
								Physical Spaces:&nbsp;
							</span>
							Good will have physical locations that store select items from
							different creators, facilitating easier delivery for customers
							nearby.
						</div>
					</li>
					<li>
						<div>
							<span className='text-black subpixel-antialiased '>
								Physical Sales Opportunities:&nbsp;
							</span>
							Creators with exceptional items may be given the chance to sell
							their items directly to customers at these physical spaces.
						</div>
					</li>
				</ul>
			</article>
			<p>
				By checking the box below, you confirm that you have carefully read and
				understood all the information provided about how Good operates,
				including our commission structure, delivery support, and opportunities
				for showcasing your items.
			</p>
			<p className='flex mt-7'>
				<Checkbox className='square' /> I acknowledge that I have read and
				understood the information above.
			</p>
			<SimpleBtn className='cont_'>Continue</SimpleBtn>
		</div>
	);
};

export default TnC;
