import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER, CLEAR_SESSION_ERRORS } from "../../actions/session_actions"

const sessionErrorsReducer = (prevState = [], action) => {
    Object.freeze(prevState)

    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            
            return action.errors;
        case RECEIVE_CURRENT_USER:
            return [];
        case CLEAR_SESSION_ERRORS:
            return [];
        default:
            return prevState;
    }
}

export default sessionErrorsReducer;