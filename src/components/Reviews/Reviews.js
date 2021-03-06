import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../Context';
import { useDispatch } from 'react-redux';
import { editProductReview } from '../../redux/actions/productAction/productAction';
import { Button } from 'bootstrap-4-react/lib/components';
import Rating from '../Rating/Rating';
import NewReview from './NewReview/NewReview';
import UpdateReview from './UpdateReview/UpdateReview';
import EditBtn from '../EditBtn';
import DeleteBtn from '../DeleteBtn';
import './Reviews.styles.css';

function Reviews({ product }) {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { loggedIn, currentUser, userDetails } = useContext(UserContext);
	const [showing, setShowing] = useState(false);
	const [editShowing, setEditShowing] = useState(false);
	const [rating, setRating] = useState(null);

	const handleShowing = (event) => {
		event.preventDefault();
		setShowing(!showing);
	};

	const handleEditShowing = (event) => {
		event.preventDefault();
		setEditShowing(!editShowing);
	};

	const initialReviewData = {
		rating: rating,
		product_id: id,
		review_title: '',
		review_body: '',
	};

	const [newReview, setNewReview] = useState(initialReviewData);

	const handleChange = (event) => {
		setNewReview((prevState) => {
			return { ...prevState, [event.target.id]: event.target.value };
		});
	};

	if (!currentUser) {
		return (
			<p>
				Please
				<a href='/login' className='errorLogin'>
					{' '}
					log in
				</a>{' '}
				to create a review.
			</p>
		);
	}
	return (
		<div>
			<div className='row'>
				<div className='reviews'>
					{!product.reviews.length && (
						<p className='noReview'>No reviews yet!</p>
					)}
					<Button
						md
						outline
						style={{ backgroundColor: 'pink', color: 'white', display: 'flex' }}
						onClick={handleShowing}
						className='reviewsBtn'>
						{' '}
						Add a review
					</Button>
				</div>

				<div className='review-results'>
					{product.reviews.map((item) => {
						return (
							<div key={item.id}>
								<div className='' style={{ width: '18rem', marginTop: '30px' }}>
									<div className='' key={item.id}>
										<Rating
											item={item}
											key={item.id}
											value={item.rating}
											color='#f8e825'
										/>
										<div className='reviewButtons'>
											<h5 className='card-title'>{item.review_title}</h5>
												{item.owner === userDetails.name ? (
													<div className='reviewButtonControls'>
														<EditBtn
															item={item}
															handleEditShowing={handleEditShowing}
														/>
														<DeleteBtn item={item} />
													</div>
												) : null}
										</div>
										<h6 className='card-subtitle mb-2 text-muted'>
											{item.owner}
										</h6>
										<p className='card-text'>{item.review_body}</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				{!loggedIn && editShowing ? (
					<UpdateReview
						handleChange={handleChange}
						newReview={newReview}
						setRating={setRating}
					/>
				) : null}
				{!loggedIn && showing ? (
					<NewReview
						handleChange={handleChange}
						newReview={newReview}
						setNewReview={setNewReview}
						editShowing={editShowing}
						rating={rating}
						setRating={setRating}
					/>
				) : null}
			</div>
		</div>
	);
}

export default Reviews;
