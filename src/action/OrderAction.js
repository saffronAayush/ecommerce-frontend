import axios from "axios";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ORDER_ERROR,
} from "../slices/OrderSlice";
import {
    MY_ORDER_REQUEST,
    MY_ORDER_FAIL,
    MY_ORDER_SUCCESS,
    CLEAR_MY_ORDER_ERROR,
} from "../slices/MyOrderSlice";
import {
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    CLEAR_ORDER_DETAILS_ERROR,
} from "../slices/OrderDetailSlice";
import {
    ADMIN_ORDER_REQUEST,
    ADMIN_ORDER_FAIL,
    ADMIN_ORDER_SUCCESS,
    ADMIN_ORDER_CLEAR_ERROR,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_CLEAR_ERROR,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_CLEAR_ERROR,
} from "../slices/AdminOrderSlice.js";

axios.defaults.withCredentials = true;

// Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(CREATE_ORDER_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            "https://ecommerce-backend-for-fun.vercel.app/api/v1/order/new",
            order,
            config
        );
        dispatch(CREATE_ORDER_SUCCESS(data.order));
    } catch (error) {
        dispatch(
            CREATE_ORDER_FAIL(
                error.response?.data?.message || "Failed to create order"
            )
        );
    }
};

// Get My Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch(MY_ORDER_REQUEST());
        const { data } = await axios.get(
            "https://ecommerce-backend-for-fun.vercel.app/api/v1/order/me"
        );
        dispatch(MY_ORDER_SUCCESS(data.orders));
    } catch (error) {
        dispatch(
            MY_ORDER_FAIL(
                error.response?.data?.message || "Failed to fetch orders"
            )
        );
    }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(ORDER_DETAILS_REQUEST());
        const { data } = await axios.get(
            `https://ecommerce-backend-for-fun.vercel.app/api/v1/order/${id}`
        );
        dispatch(ORDER_DETAILS_SUCCESS(data.order));
    } catch (error) {
        dispatch(
            ORDER_DETAILS_FAIL(
                error.response?.data?.message || "Failed to fetch order details"
            )
        );
    }
};

// Get All Orders (Admin)
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch(ADMIN_ORDER_REQUEST());
        const { data } = await axios.get(
            "https://ecommerce-backend-for-fun.vercel.app/api/v1/admin/orders"
        );
        dispatch(ADMIN_ORDER_SUCCESS(data));
    } catch (error) {
        dispatch(
            ADMIN_ORDER_FAIL(
                error.response?.data?.message || "Failed to fetch all orders"
            )
        );
    }
};

// Update Order (Admin)
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch(UPDATE_ORDER_REQUEST());
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            `https://ecommerce-backend-for-fun.vercel.app/api/v1/admin/order/${id}`,
            order,
            config
        );
        dispatch(UPDATE_ORDER_SUCCESS(data));
    } catch (error) {
        dispatch(
            UPDATE_ORDER_FAIL(
                error.response?.data?.message || "Failed to update order"
            )
        );
    }
};

// Delete Order (Admin)
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch(DELETE_ORDER_REQUEST());
        const { data } = await axios.delete(
            `https://ecommerce-backend-for-fun.vercel.app/api/v1/admin/order/${id}`
        );
        dispatch(DELETE_ORDER_SUCCESS(data));
    } catch (error) {
        dispatch(
            DELETE_ORDER_FAIL(
                error.response?.data?.message || "Failed to delete order"
            )
        );
    }
};

// Clear Errors
export const clearOrderError = () => async (dispatch) => {
    dispatch(CLEAR_ORDER_ERROR());
};
export const clearMyOrderError = () => async (dispatch) => {
    dispatch(CLEAR_MY_ORDER_ERROR());
};
export const clearOrderDetailsError = () => async (dispatch) => {
    dispatch(CLEAR_ORDER_DETAILS_ERROR());
};
export const clearAdminOrderError = () => async (dispatch) => {
    dispatch(ADMIN_ORDER_CLEAR_ERROR());
};
export const clearUpdateOrderError = () => async (dispatch) => {
    dispatch(UPDATE_ORDER_CLEAR_ERROR());
};
export const clearDeleteOrderError = () => async (dispatch) => {
    dispatch(DELETE_ORDER_CLEAR_ERROR());
};
