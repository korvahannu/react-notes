export const INITIAL_STATE = {
    loading: false,
    post: {},
    error: false
};

export const ACTION_TYPES = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR"
};

export const myAmazingReducer = (state, action) => {
    switch(action.type) {
        case ACTION_TYPES.FETCH_START:
            return {
                loading: true,
                error: false,
                post: {}
            }
        case ACTION_TYPES.FETCH_SUCCESS:
            return {
                loading: false,
                error: false,
                post: action.data
            }
        case ACTION_TYPES.FETCH_ERROR:
            return {
                loading: false,
                error: true,
                post: {}
            }
        default:
            return state;
    }
};