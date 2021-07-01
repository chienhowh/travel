import { RootState } from './../store';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';


export const FETCH_RECOMMEND_PRODUCT_START = 'FETCH_RECOMMEND_PRODUCT_START';
export const FETCH_RECOMMEND_PRODUCT_SUCCESS = 'FETCH_RECOMMEND_PRODUCT_SUCCESS';
export const FETCH_RECOMMEND_PRODUCT_FAIL = 'FETCH_RECOMMEND_PRODUCT_FAIL';
interface fetchRecommendProductStart {
    type: typeof FETCH_RECOMMEND_PRODUCT_START
}
interface fetchRecommendProductSuccess {
    type: typeof FETCH_RECOMMEND_PRODUCT_SUCCESS;
    payload: any
}
interface fetchRecommendProductFail {
    type: typeof FETCH_RECOMMEND_PRODUCT_FAIL,
    payload: any
}
// action 集合
export type recommendProductAction = fetchRecommendProductStart | fetchRecommendProductSuccess | fetchRecommendProductFail

export const fetchRecommendProductStartActionCreator = (): fetchRecommendProductStart => {
    return {
        type: FETCH_RECOMMEND_PRODUCT_START
    }
}

export const fetchRecommendProductSuccessActionCreator = (data: any): fetchRecommendProductSuccess => {
    return {
        type: FETCH_RECOMMEND_PRODUCT_SUCCESS,
        payload: data
    }
}

export const fetchRecommendProductFailActionCreator = (error: any): fetchRecommendProductFail => {
    return {
        type: FETCH_RECOMMEND_PRODUCT_FAIL,
        payload: error
    }
}

// 函數, state, 額外參數, action
export const fetchRecommendProductCreator = (): ThunkAction<void, RootState, unknown, recommendProductAction> => async (dispatch, getState) => {
    dispatch(fetchRecommendProductStartActionCreator());
    try {
        const { data } = await axios.get('http://123.56.149.216:8089/api/productCollections');
        const action = fetchRecommendProductSuccessActionCreator(data)
        dispatch(action);
    } catch (error) {
        const action = fetchRecommendProductFailActionCreator(error);
        dispatch(action);
    }
}

