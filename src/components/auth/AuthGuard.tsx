import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../../store/reducers/user';

type AuthProps = {
    children: JSX.Element
}

const AuthGuard = ({children}:AuthProps) => {
    const isLoggedIn = useSelector((userState: UserState) => userState.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    return children;

};

export default AuthGuard;