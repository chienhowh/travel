
import { Middleware } from 'redux';
export const actionLog: Middleware = (store) => (next) => (action) => {
    console.log('preve state:', store.getState());
    console.log('fire: ', action);
    next(action);
}