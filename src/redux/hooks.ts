import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from './store';

//typeselectorhook 原生的
// rootState是返回
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;