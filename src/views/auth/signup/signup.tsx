import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import { API_SERVER } from '../../../config/constant';
import NavBar from '../../NavBar';

import '../../../hememics.css';

const logo = require('../../../assets/HeMemics_Logo.png');

const SignUp = () => {

    const [formFields, updateFields] = useState({
        username: '',
        email: '',
        password: '',
        error: '',
    })

    const navigate = useNavigate()


    const catchError = (error:any)=>{
        const newFields = {...formFields};

        newFields.error = error.response.data.msg;

        if (newFields.error.search('short') > 0){
            newFields.error = 'One or more of the fields you entered are invalid';
        }

        //console.log(error);

        updateFields(newFields);
    }

    const onSubmit = () => {
        try {
            const postPromise = axios.post(API_SERVER + 'users/register', {
                username: formFields.username,
                password: formFields.password,
                email: formFields.email,
            });
            
            postPromise.catch(catchError);

            postPromise.then(response=>{
                if(response.data.success){
                    console.log(response.data);
                    navigate("/");
                }else{
                    console.log('signup faild!!!');
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
            <NavBar />
            <div className='center-vert'>
            <div className='center'>
                    <div className='label' id='label-register'>
                        <a href="https://hememics.com" >
                            <img src={logo} alt="hememics logo" className="logo"/>
                        </a>
             <h3 id='header'>Username</h3>
                    <input type="text" className='field' onChange={(event)=> {
                        updateFields({
                            username: event.target.value,
                            email: formFields.email,
                            password: formFields.password,
                            error: '',
                        });
                    }} value={formFields.username} />
                
            <h3 id='header'>Email</h3>
                    <input type="text" className='field' onChange={(event)=> {
                        updateFields({
                            username: formFields.username,
                            email: event.target.value,
                            password: formFields.password,
                            error: '',
                        });
                    }} value={formFields.email} />
           
              <h3 id='header'> Password</h3>
                    <input type="password" className='field' onChange={(event)=> {
                        updateFields({
                            username: formFields.username,
                            email: formFields.email,
                            password: event.target.value,
                            error: '',
                        });
                    }} value={formFields.password}/>                    

                <p id='register'>Already have an account? Login <a href='#' onClick={()=>{navigate("/login")}} id='link-color'> here</a></p> 

                
                <button type="button" className='login-btns' onClick={onSubmit}><h3>Register</h3></button>
                <p></p>
            </div>
            </div>
            <div>
                {showError(formFields.error)}
            </div>
        </div>
        </div>
    )
}

export default SignUp;