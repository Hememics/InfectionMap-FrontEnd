import React from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { userLogout } from '../../../store/actions/UserActions';


const SignOut: React.FC<SignOutProps> = ({dispatch}) =>{

    const signoutFunc = () => {
        dispatch(userLogout());
        return <div><p>You're logged out!</p><p><Link to="/">Home</Link></p></div>;
    }

    return <div>{signoutFunc()}</div>;
}



const connector = connect();

type SignOutProps = ConnectedProps<typeof connector>;

export default connector(SignOut);