import { shoppingCart } from './shoppingCart/slice';
import { user } from './user/slice';
import languageReducer from './language/languageReducer';
import recommendProductReducer from './recommendProduct/recommendProductReducer';
import { actionLog } from './middlewares/actionlog';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productDetail } from './productdetail/slice';
import { productSearch } from './productSearch/slice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { order } from './order/slice';


// 持久化
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}


// 包含全部reducer
const rootReducer = combineReducers({
    language: languageReducer,
    recommendProduct: recommendProductReducer,
    productDetail: productDetail.reducer,
    productSearch: productSearch.reducer,
    user: user.reducer,
    shoppingCart: shoppingCart.reducer,
    order: order.reducer
})

// 轉換reducer成持久化
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog]
})

const persistor = persistStore(store);

// store會有全部reducer的資料，rootState儲存所有資料類型
export type RootState = ReturnType<typeof store.getState>

export default { store, persistor };