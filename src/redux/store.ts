import { createStore, combineReducers, applyMiddleware } from 'redux';
import languageReducer from './language/languageReducer';
import recommendProductReducer from './recommendProduct/recommendProductReducer';
import thunk from 'redux-thunk';
import { actionLog } from './middlewares/actionlog';

// 包含全部reducer
const rootReducer = combineReducers({
    language: languageReducer,
    recommendProduct: recommendProductReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

// store會有全部reducer的資料，rootState儲存所有資料類型
export type RootState = ReturnType<typeof store.getState>

export default store;