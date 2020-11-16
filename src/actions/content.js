import {
    ADD_POST_SUCCESS,
    ADD_POST_FAIL,
    GET_POST_FAIL,
    GET_POST_SUCCESS,
    UPDATE_POST_FAIL,
    UPDATE_POST_SUCCESS,
    DELETE_POST_FAIL,
    DELETE_POST_SUCCESS,
    SET_MESSAGE,
    CLEAR_MESSAGE
} from './types';
import contentService from '../services/content.service';

const addPosts = (title, content, postedBy) => dispatch => {
    return contentService.addPost(title, content, postedBy)
        .then(response => {
            dispatch({
                type: ADD_POST_SUCCESS
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message
            });

            return Promise.resolve();
        },
            error => {
                const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                dispatch({
                    type: ADD_POST_FAIL
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: message
                });
                
                return Promise.reject();
            }
        );
};

export default { addPosts };