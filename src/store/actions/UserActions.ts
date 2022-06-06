import ActionTypes, { UserAction } from '../constants/ActionTypes';

const userLogin = (username: string, email: string, token: string): UserAction => ({
    type: ActionTypes.Login,
    username,
    email,
    token,
});

const userLogout = (): UserAction => ({
    type: ActionTypes.Logout,
    username: '',
    email: '',
    token: '',
});


export {userLogin, userLogout};