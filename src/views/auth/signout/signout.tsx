import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userLogout } from '../../../store/actions/UserActions';


const SignOut = () =>{
    const dispatch = useDispatch();

    const signoutFunc = () => {
        dispatch(userLogout());
        return <div><p>You're logged out!</p><p><Link to="/">Home</Link></p></div>;
    }

    return <div>{signoutFunc()}</div>;
}

export default SignOut;