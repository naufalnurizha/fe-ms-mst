import {
  SET_CURRENT_KEY
} from '../action-types';

export const setCurrentKey = id => async dispatch => {
  return dispatch({ type: SET_CURRENT_KEY, payload: id });
}