import { FETCH_RECOMMEND_PRODUCT_FAIL, FETCH_RECOMMEND_PRODUCT_START, FETCH_RECOMMEND_PRODUCT_SUCCESS, recommendProductAction } from "./recommendProductAction";

export interface RecommendProductState {
    isLoading: boolean;
    error: string | null;
    productList: any;
}

const defaultState: RecommendProductState = {
    isLoading: true,
    error: null,
    productList: []
}

const recommendProductReducer = (state = defaultState, action: recommendProductAction): RecommendProductState => {
    switch (action.type) {
        case FETCH_RECOMMEND_PRODUCT_START:
            return { ...state, isLoading: true }
        case FETCH_RECOMMEND_PRODUCT_SUCCESS:
            return { ...state, productList: action.payload, isLoading: false };
        case FETCH_RECOMMEND_PRODUCT_FAIL:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    };
}

export default recommendProductReducer;