import { combineReducers } from 'redux';
import cryptoArea from './cryptoArea';

const rootReducer = combineReducers({ cryptoArea });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
