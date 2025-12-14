import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CLEAR_ORDER_MESSAGE,
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,

    CANCEL_ORDER_SUCCESS
} from "../action/orderAction";

const initialState = {
    loading: false,
    successMessage: "",
    error: null,
    orders: [],
    page: 1,
    totalPages: 1,
    fetchingOrders: false,
    ordersError: null,
    totalOrders: 0,
};
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { ...state, loading: true, successMessage: "", error: null };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: `Order placed successfully!`,
            };
        case CREATE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_ORDERS_REQUEST:
            return { ...state, fetchingOrders: true, ordersError: null };
        case FETCH_ORDERS_SUCCESS:

            return {
                ...state,
                fetchingOrders: false,
                orders: action.payload.orders,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                totalOrders: action.payload.orders.length,
            };
        case FETCH_ORDERS_FAILURE:
            return { ...state, fetchingOrders: false, ordersError: action.payload };

        case CLEAR_ORDER_MESSAGE:
            return { ...state, successMessage: "", error: null };


        case "CANCEL_ORDER_SUCCESS":
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.orderId === action.payload
                        ? { ...order, status: "Cancelled" }
                        : order
                ),
            };
        default:
            return state;
    }
};
