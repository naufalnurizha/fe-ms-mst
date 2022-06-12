import {
    GET_QUESTION1_LIST,
    GET_QUESTION2_LIST
} from '../action-types';

const initialState = {
    questOneList: [],
    questTwoList: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUESTION1_LIST:
            return { ...state, questOneList: action.payload }
        case GET_QUESTION2_LIST:
            return { ...state, questTwoList: action.payload }
        default:
            return state;
    }
}

export default reducer;