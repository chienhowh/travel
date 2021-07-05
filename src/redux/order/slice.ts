import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { checkout } from "../shoppingCart/slice";

interface OrderState {
    loading: boolean;
    error: null | string;
    currentOrder: any
}

const initialState: OrderState = {
    loading: false,
    error: null,
    currentOrder: null
}


export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (params: { jwt: string, orderId: string }, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8089/api/orders/${params.orderId}/placeOrder`, null, {
            headers: { Authorization: `bearer ${params.jwt}` }
        });
        return data;
    }
)


export const order = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: {
        [placeOrder.pending.type]: (state, action) => {
            state.loading = true
        },
        // 付款成功
        [placeOrder.fulfilled.type]: (state, action) => {
            state.currentOrder = action.payload;
            state.error = null;
            state.loading = false;
        },
        [placeOrder.rejected.type]: (state, action) => {
            state.error = action.error.message
            state.loading = false
        },
        [checkout.pending.type]: (state, action) => {
            state.loading = true
        },
        // 點選結帳，先把資料給checkoutcard
        [checkout.fulfilled.type]: (state, action) => {
            state.currentOrder = action.payload;
            state.error = null;
            state.loading = false;
        },
        [checkout.rejected.type]: (state, action) => {
            state.error = action.error.message
            state.loading = false
        },
    }
})