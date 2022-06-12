import {
  SET_CURRENT_KEY
} from '../action-types';

const initialState = {
  activeKey: '1'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_KEY:
      return { ...state, activeKey: action.payload }
    default:
      return state;
  }
}

export default reducer;