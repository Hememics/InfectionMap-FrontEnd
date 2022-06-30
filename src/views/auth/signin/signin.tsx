import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import axios from 'axios';

import NavBar from '../../NavBar';
import { API_SERVER } from '../../../config/constant';
import { userLogin } from '../../../store/actions/UserActions';

import '../../../hememics.css';

const logo = require('../../../assets/HeMemics_Logo.png');

const SignIn: React.FC<SignInProps> = ({ dispatch }) => {

    const [formFields, updateFields] = useState({
        email: '',
        password: '',
        error: '',
    })

    const navigate = useNavigate()

    const catchError = (error:any)=>{
        const newFields = {...formFields};

        newFields.error = error.response.data.msg;

        if (newFields.error.search('too') > 0){
            newFields.error = 'One or more of the fields you entered are invalid';
        }

        //console.log(error);

        updateFields(newFields);
    }

    const onSubmit = () => {
        try {

            const postPromise = axios.post(API_SERVER + 'users/login', {
                password:   formFields.password,
                email: formFields.email
            });

            postPromise.catch(catchError);
            
            postPromise.then(response=>{
                if(response.data.success){
                    console.log(response.data);
                    dispatch(userLogin(response.data.user._id, response.data.user.username, response.data.user.email, response.data.token));
                    navigate("/");
                }else{
                    console.log('login faild!!!');
                    console.log(response);
                    console.log('~~~~~~~~~~~~~~~~');
                    catchError(response);
                }
            }).catch(catchError);
        } catch (error) {
            catchError(error);
        }
    };


    const showError = (errorMsg:string) =>{
        if(errorMsg.length>0){
            return <div className="color"><button className="error">{errorMsg}</button></div>;
        }

        return <></>;
    }


    return (
        <div>

            {NavBar()}

                <div className='center-label'>
                    <div className='label'>
                        <a href="https://hememics.com" >
                            <img src={logo} alt="hememics logo" className="logo"/>
                        </a>
                        <h3 id='header'>Email</h3>
                        <input type="text" className='field' onChange={(event)=> {
                            updateFields({
                                email: event.target.value,
                                password: formFields.password,
                                error: '',
                            });
                        }} value={formFields.email} />
            
                        <h3 id='header'>Password</h3>
                        <input type="password" className='field' onChange={(event)=> {
                            updateFields({
                                email: formFields.email,
                                password: event.target.value,
                                error: '',
                            });
                        }} value={formFields.password}/>

                        <p id='register'>Don't have an account? Create one <a href='#' onClick={()=>{navigate("/register")}} id='link-color'> here</a></p> 

                        <div>
                            {showError(formFields.error)}
                        </div>
                        
                        <button type="button" className='login-btns' onClick={onSubmit}><h3>Login</h3></button>
                    
                    </div>
                </div>
            </div>
    )
}

const connector = connect();

type SignInProps = ConnectedProps<typeof connector>;

export default connector(SignIn);

// register button (fix)
//<button type="button" onClick={()=>{navigate("/register")}}>Register</button>