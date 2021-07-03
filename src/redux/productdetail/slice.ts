
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const productDetail = createSlice({
    name: 'productdetail',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true
        },
        fetchSuccess: (state, action) => {
            state.product = action.payload;
            state.error = null;
            state.loading = false;
        },
        fetchFail: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = false
        }
    }
})