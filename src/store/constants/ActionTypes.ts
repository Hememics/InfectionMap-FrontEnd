enum ActionType {
    Login,
    Logout,
}

type UserAction = {
    type: ActionType,
    userid: string,
    username: string,
    email: string,
    token: string,
}


export {ActionType as default, UserAction};