enum ActionType {
    Login,
    Logout,
}

type UserAction = {
    type: ActionType,
    username: string,
    email: string,
    token: string,
}


export {ActionType as default, UserAction};