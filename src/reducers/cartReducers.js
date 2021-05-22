import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    //add products to cart
    case ADD_TO_CART:
      return { ...state, items: action.payload.cartItems };
    //remove products from cart
    case REMOVE_FROM_CART:
      return { ...state, items: action.payload.cartItems };

    default:
      return state;
  }
}
