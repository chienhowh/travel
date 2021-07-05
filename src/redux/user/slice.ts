import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface UserState {
    loading: boolean,
    token: string | null,
    error: string | null
}

const initialState: UserState = {
    loading: false,
    token: null,
    error: null
}


export const signIn = createAsyncThunk(
    'user/signIn',
    async (parmeters: { email: string, password: string }) => {
        const { data } = await axios.post('http://123.56.149.216:8089/auth/login', { ...parmeters })
        return data.token
    }
)

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOut: (state) => {
            state.error = null;
            state.loading = false;
            state.token = null;
        }
    },
    extraReducers: {
        [signIn.pending.type]: (state, action) => {
            state.loading = true
        },
        [signIn.fulfilled.type]: (state, action) => {
            console.log(action);
            state.token = action.payload;
            state.error = null;
            state.loading = false;
        },
        [signIn.rejected.type]:
            (state, action) => {
                state.error = action.error.message
                state.loading = false
            }
    }
})