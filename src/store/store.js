import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk, withExtraArgument } from "redux-thunk"
import { authReducer } from "./reducers/authReducer.js";
import {productReducer} from "./reducers/productReducer";
import {orderReducer} from "./reducers/orderReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
    order: orderReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
