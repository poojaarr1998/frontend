import API from "../../apis";
import {authSuccessMsg} from "./authActions";


export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";
export const CLEAR_ORDER_MESSAGE = "CLEAR_ORDER_MESSAGE";


export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";


export const CANCEL_ORDER_REQUEST = "CANCEL_ORDER_REQUEST";
export const CANCEL_ORDER_SUCCESS = "CANCEL_ORDER_SUCCESS";
export const CANCEL_ORDER_FAIL = "CANCEL_ORDER_FAIL";


export const createOrder = (orderData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const res = await API.post("/api/orders/createOrder", orderData);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: res.data,
        });
        if (res.data.message) {
            dispatch(authSuccessMsg(res.data.message));
            return res.data.message;
        }
    } catch (err) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: err.response?.data?.message || "Order failed",
        });
    }
};

export const fetchOrderList = () => async (dispatch) => {
    dispatch({ type: FETCH_ORDERS_REQUEST });
    try {
        const { data } = await API.get("/api/orders/orderList");

        dispatch({
            type: FETCH_ORDERS_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: FETCH_ORDERS_FAILURE,
            payload: err.response?.data?.message || "Failed to fetch orders",
        });
    }
};

export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    try {
      const res =  await API.put("/api/orders/cancel", {
            orderId,
        });
        dispatch({
            type: CANCEL_ORDER_SUCCESS,
            payload: orderId,
        });
        if (res.data.message) {
            dispatch(authSuccessMsg(res.data.message));
            return res.data.message;
        }
    } catch (error) {
        dispatch({
            type: CANCEL_ORDER_FAIL,
            payload: error.response?.data?.message || "Cancel failed",
        });
    }
};

export const clearOrderMessage = () => ({
    type: CLEAR_ORDER_MESSAGE,
});
