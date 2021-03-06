import {
	ADD_TO_CART,
	DELETE_FROM_CART,
	SAVE_SHIPPING_ADDRESS,
	GET_CART_TOTAL,
	CLEAR_SHOPPING_CART,
} from '../constants/cartConstants';

const initialstate = {
	cartItems: [],
	shippingAddress: {},
};

export const cartReducer = (state = initialstate, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const cartItems = action.payload;
			const existItem = state.cartItems.find(
				(x) => x.product === cartItems.product
			);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === existItem.product ? cartItems : x
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, cartItems],
				};
			}

		case DELETE_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
			};

		case GET_CART_TOTAL:
			return {
				...state,
				cartTotal: state.cartItems
					.reduce((acc, item) => acc + item.qty * item.price, 0)
					.toFixed(2),
			};

		case SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};

		case CLEAR_SHOPPING_CART:
			return {
				...state,
				cartItems: []
			}
		default:
			return state;
	}
};
