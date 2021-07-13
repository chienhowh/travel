
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getProductDetail } from "../productdetail/slice";
import { tify, sify } from 'chinese-conv';
interface ProductSearchState {
    loading: boolean;
    error: null | string;
    product: any,
    pagination: any
}

const initialState: ProductSearchState = {
    loading: true,
    error: null,
    product: null,
    pagination: null
}



export const getProductSearch = createAsyncThunk(
    // name會放到action.type
    'productSearch/getProductSearch',
    async (parameters: {
        keywords: string,
        pageNumber: string | number, // 第幾頁
        pageSize: string | number
    }, thunkAPI) => {
        let url = `http://123.56.149.216:8089/api/touristRoutes?pageSize=${parameters.pageSize}&pageNumber=${parameters.pageNumber}`

        console.log(parameters.keywords);

        if (parameters.keywords) {
            const sifyKeyword = sify(parameters.keywords);
            url += `&keyword=${sifyKeyword}`;
        }
        const response = await axios.get(url);
        const data = response.data;
        // 轉繁體
        const tifyData = data.map((d: any) => {
            for (const i in d) {
                if (typeof d[i] === 'string') {
                    d[i] = tify(d[i]);
                }
            }
            return d;
        });

        return {
            // return的東西會塞進action.payload裡
            data: tifyData,
            pagination: JSON.parse(response.headers['x-pagination'])
        }
    }
)

export const productSearch = createSlice({
    name: 'productSearch',
    initialState,
    reducers: {},
    extraReducers: {
        [getProductSearch.pending.type]: (state, action) => {
            state.loading = true
        },
        [getProductSearch.fulfilled.type]: (state, action) => {
            console.log(action.payload.data)
            state.product = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
            state.error = null;
        },
        [getProductSearch.rejected.type]: (
            state,
            action
        ) => {
            state.loading = false;
            state.error = action.error.message;
        },
    }

});