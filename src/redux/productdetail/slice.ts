
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { tify, sify } from 'chinese-conv';

interface ProductDetailState {
    loading: boolean;
    error: null | string;
    product: any
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    product: null
}


export const getProductDetail = createAsyncThunk(
    'productdetail/getProductDetail',
    async (touristRouteId: string, thunkAPI) => {
        const { data } = await axios.get(`http://123.56.149.216:8089/api/touristRoutes/${touristRouteId}`);
      
        for (const i in data) {
            if(typeof data[i]==='string'){
                data[i]=tify(data[i]);
            }
        }
        return data;
    }
)


export const productDetail = createSlice({
    name: 'productdetail',
    initialState,
    reducers: {},
    extraReducers: {
        [getProductDetail.pending.type]: (state, action) => {
            console.log(action);
            state.loading = true
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            state.product = action.payload;
            state.error = null;
            state.loading = false;
        },
        [getProductDetail.rejected.type]:
            (state, action) => {
                state.error = action.error.message
                state.loading = false
            }
    }
})