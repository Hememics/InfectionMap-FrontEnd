import React, {useState} from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserState } from '../../store/reducers/user';
import axios from 'axios';

import { API_SERVER } from '../../config/constant';

type AuthProps = {
    children: JSX.Element
}


enum GaurdStateEnum {
    Checking,
    OK,
    BadToken,
    LoggedOut,
}

type Gaurdstate = {
    state:GaurdStateEnum;
    error:string;
}

const BadToken = (errorMsg:string) => {
    return (<div>
        <p>User Token is Invalid!</p>
        <p>{errorMsg}</p>
        <Link to="/login">Login</Link>
    </div>)

}


const AuthGuard = ({children}:AuthProps) => {
    const isLoggedIn = useSelector((userState: UserState) => userState.isLoggedIn);
    const userToken = useSelector((userState: UserState) => userState.token);

    const [guardState, updateGaurdState] = useState({state:GaurdStateEnum.Checking, error:''});

    

    switch (guardState.state){
        case GaurdStateEnum.Checking:{

            if (!isLoggedIn) {
                updateGaurdState({state:GaurdStateEnum.LoggedOut, error:''});
            }else{
                
                    const getInstance = axios.create({
                        baseURL: API_SERVER + 'users/',
                        timeout: 1000,
                        headers: {'authorization': userToken},
                    });
            

                    const catchError = (error:any)=>{
                        updateGaurdState({state:GaurdStateEnum.BadToken, error:error.response.data.msg});                       
                    };

                    const getPromise = getInstance.get('checktoken');

                    getPromise.catch(catchError);

                    getPromise.then((response)=>{
                        if (response.data.success){
                            updateGaurdState({state:GaurdStateEnum.OK, error:''});
                        }else{
                            updateGaurdState({state:GaurdStateEnum.BadToken, error:response.data.msg});
                        }
                    }).catch(catchError);            
            }

            return <div>Checking Token...</div>;
        }            
        case GaurdStateEnum.OK:
            return children;
        case GaurdStateEnum.BadToken:
            return BadToken(guardState.error);
        case GaurdStateEnum.LoggedOut:
            return <Navigate to="/login" />;
    }
    

};

export default AuthGuard;