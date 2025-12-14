import axios from "axios";
import API from "../../apis";
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const FETCH_Orders_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_Orders_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_Orders_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
        const { data } = await API.get("/api/products");
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload:data });
    } catch (err) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: err.message });
    }
};


const initialState = { items: [], loading: false, error: null };

export const productReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_PRODUCTS_SUCCESS:
            return { ...state, loading: false, items: action.payload };
        case FETCH_PRODUCTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
