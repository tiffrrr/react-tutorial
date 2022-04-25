// 有多個reducer，需合併
import { combineReducers } from 'redux';

import infoReducer from './infoReducer';
import anchorReducer from './anchorReducer';

const rootReducer = combineReducers({
    infoReducer,
    anchorReducer,
});

export default rootReducer;