import { createStore, combineReducers } from 'redux';
import languageReducer from './language/languageReducer';
import recommendProductReducer from './recommendProduct/recommendProductReducer';

// 包含全部reducer
const rootReducer = combineReducers({
    language:languageReducer,
    recommendProduct:recommendProductReducer
})
const store = createStore(rootReducer)

// store會有全部reducer的資料，rootState儲存所有資料類型
export type RootState = ReturnType<typeof store.getState>

export default store;