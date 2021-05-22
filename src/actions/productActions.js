import productData from "../products.json";
import { FETCH_PRODUCTS } from "./types";

export const fetchProducts = () => (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS, payload: productData.products });
};
