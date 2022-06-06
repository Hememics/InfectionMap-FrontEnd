

import ActionType, {UserAction} from '../constants/ActionTypes';

type UserState = {
    username: string,
    email: string,
    token: string,
    isLoggedIn: boolean,
}

const initalState: UserState = {
    username: '',
    email: '',
    token: '',
    isLoggedIn: false,
}

const user = (state : UserState, action: UserAction) => {
    switch(action.type) {
        case ActionType.Login:
            {
                const newState = {...state};
                newState.email = action.email;
                newState.username = action.username;
                newState.token = action.token;
                newState.isLoggedIn = true;
                return newState;
            }
        case ActionType.Logout:
            {
                const newState = {...state};
                newState.email = '';
                newState.username = '';
                newState.token = '';
                newState.isLoggedIn = false;
                return newState;
            }
        default:
            return state;
    }
}


export default user;

export {UserState, initalState};