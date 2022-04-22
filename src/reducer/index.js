// 有多個reducer，需合併
import { combineReducers } from 'redux';

import infoReducer from './infoReducer';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
    infoReducer,
    dataReducer,
});

export default rootReducer;