
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { tify } from 'chinese-conv';

interface ShoppingCartState {
    loading: boolean;
    error: null | string;
    items: any[]
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    items: []
}

// read 
export const getShoppingCart = createAsyncThunk(
    'shoppingCart/getShoppingCart',
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.get(`http://123.56.149.216:8089/api/shoppingCart`,
            { headers: { Authorization: `bearer ${jwt}` } });
        const shoppingCartItems = data.shoppingCartItems;
        // 轉繁體
        const tifyData = shoppingCartItems.map((d: any) => {
            const touristRoute = d.touristRoute;
            for (const i in touristRoute) {
                if (typeof touristRoute[i] === 'string') {
                    touristRoute[i] = tify(touristRoute[i]);
                }
            }
            return d;
        });
        console.log(tifyData)
        return tifyData;
    }
)

// post 
export const addShoppingCart = createAsyncThunk(
    'shoppingCart/addShoppingCart',
    async (parameters: { touristRouteId: string, jwt: string }, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8089/api/shoppingCart/items`,
            { touristRouteId: parameters.touristRouteId },
            { headers: { Authorization: `bearer ${parameters.jwt}` } });
        return data.shoppingCartItems;
    }
);

export const checkout = createAsyncThunk(
    'shoppingCart/checkout',
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8089/api/shoppingCart/checkout`,
            null,
            { headers: { Authorization: `bearer ${jwt}` } });
        const orderItems = data.orderItems;
        // 轉繁體
        orderItems.map((d: any) => {
            const touristRoute = d.touristRoute;
            for (const i in touristRoute) {
                if (typeof touristRoute[i] === 'string') {
                    touristRoute[i] = tify(touristRoute[i]);
                }
            }
            return d;
        });

        return data;
    }
);


//delete
export const clearShoppingCart = createAsyncThunk(
    'shoppingCart/clearShoppingCart',
    async (parameters: { jwt: string, itemIds: string[] }, thunkAPI) => {
        return await axios.delete(`http://123.56.149.216:8089/api/shoppingCart/items/(${parameters.itemIds.join(',')})`,
            { headers: { Authorization: `bearer ${parameters.jwt}` } });
    }
)


export const shoppingCart = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: {
        // get start
        [getShoppingCart.pending.type]: (state, action) => {
            state.loading = true
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.error = null;
            state.loading = false;
        },
        [getShoppingCart.rejected.type]: (state, action) => {
            state.error = action.error.message
            state.loading = false
        },
        // post start
        [addShoppingCart.pending.type]: (state, action) => {
            state.loading = true
        },
        [addShoppingCart.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.error = null;
            state.loading = false;
        },
        [addShoppingCart.rejected.type]: (state, action) => {
            state.error = action.error.message
            state.loading = false
        },
        // 去結帳
        [checkout.pending.type]: (state, action) => {
            state.loading = true
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.items = [];
            state.error = null;
            state.loading = false;
        },
        [checkout.rejected.type]: (state, action) => {
            state.error = action.error.message
            state.loading = false
        },
        // delete start
        [clearShoppingCart.pending.type]: (state, action) => {
            state.loading = true
        },
        [clearShoppingCart.fulfilled.type]: (state, action) => {
            state.items = [];
            state.error = null;
            state.loading = false;
        },
        [clearShoppingCart.rejected.type]: (state, action) => {
            state.error = action.error.message
            state.loading = false
        },
    }
})