import { combineReducers } from 'redux';

import currentReducer from './currentValue/reducer';
import questionReducer from './question/reducer';

const reducer = combineReducers({
	current: currentReducer,
	question: questionReducer
});

export default reducer;
