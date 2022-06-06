import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {Link} from 'react-router-dom';

import { UserState } from '../store/reducers/user';

const HomePage: React.FC<HomePageProps> = ({loggedIn, username}) => {


    const welcome = () => {
        if (loggedIn){
            return (<div><p>Welcome: {username}</p> <p><Link to="/logout">Logout</Link></p> </div>);
        }else{
            return(<div><p><Link to="/login">Login</Link></p>
            <p><Link to="/register">Register</Link></p></div>);
        }
    }

    return (
        <div>
            {welcome()}
        </div>
    )
}

const mapStateToProps = (state: UserState) => {


    if (state === undefined){
        return {loggedIn: false, username: ''};
    }else{
        return {loggedIn: state.isLoggedIn, username: state.username};
    }
};

const connector = connect(mapStateToProps);

type HomePageProps = ConnectedProps<typeof connector>;


export default connector(HomePage);