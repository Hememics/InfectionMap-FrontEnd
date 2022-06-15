import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import { UserState } from '../store/reducers/user';




const HomePage = () => {
    const userState:UserState = useSelector( (state:UserState) => state);

    const welcome = () => {
        if (userState.isLoggedIn){
            return (<div>
                    <p>Welcome: {userState.username}</p> 
                    <p><Link to="/logout">Logout</Link></p>
                    <p><Link to="/mytests">My Tests</Link></p>
                    <p><Link to="/map">Infection Map</Link></p>
                    </div>);
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


export default HomePage;