import { FETCH_PRODUCTS } from "../actions/types";

const initState = { items: [], filteredItems: [] };
export default function (state = initState, action) {
  switch (action.type) {
    //get all products data
    case FETCH_PRODUCTS:
      return { ...state, items: action.payload, filteredItems: action.payload };
    default:
      return state;
  }
}
