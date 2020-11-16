import { ADD_POST_FAIL, ADD_POST_SUCCESS, UPDATE_POST_SUCCESS, UPDATE_POST_FAIL, GET_POST_SUCCESS, GET_POST_FAIL, DELETE_POST_SUCCESS, DELETE_POST_FAIL } from '../actions/types';

const initialState = {};

const addPost = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_POST_SUCCESS:
            return {
                ...state
            };
        default:
            return state;
        
    };
};

export default addPost;