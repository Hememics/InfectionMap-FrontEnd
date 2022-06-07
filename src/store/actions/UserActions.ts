import ActionTypes, { UserAction } from '../constants/ActionTypes';

const userLogin = (userid: string, username: string, email: string, token: string): UserAction => ({
    type: ActionTypes.Login,
    userid,
    username,
    email,
    token,
});

const userLogout = (): UserAction => ({
    type: ActionTypes.Logout,
    userid: '',
    username: '',
    email: '',
    token: '',
});


export {userLogin, userLogout};