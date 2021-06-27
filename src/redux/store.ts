import { createStore } from 'redux';
import languageReducer from './language/languageReducer';

const store = createStore(languageReducer);

// store會有全部reducer的資料，rootState儲存所有資料類型
export  type RootState =  ReturnType<typeof store.getState>

export default store;