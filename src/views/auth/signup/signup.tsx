import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import { API_SERVER } from '../../../config/constant';

import '../../../hememics.css';

const SignUp = () => {

    const [formFields, updateFields] = useState({
        username: 'username',
        email: 'email',
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
        <div className="center">
            <button className='label'>
             <p>Username</p>
                    <input type="text" onChange={(event)=> {
                        updateFields({
                            username: event.target.value,
                            email: formFields.email,
                            password: formFields.password,
                            error: '',
                        });
                    }} value={formFields.username} />
                
            <p>Email</p>
                    <input type="text" onChange={(event)=> {
                        updateFields({
                            username: formFields.username,
                            email: event.target.value,
                            password: formFields.password,
                            error: '',
                        });
                    }} value={formFields.email} />
           
              <p> Password</p>
                    <input type="password" onChange={(event)=> {
                        updateFields({
                            username: formFields.username,
                            email: formFields.email,
                            password: event.target.value,
                            error: '',
                        });
                    }} value={formFields.password}/>                    
            
            </button>
            <div>
                {showError(formFields.error)}
            </div>
            <p>
                <button type="button" onClick={onSubmit}>Register</button>
            </p>
            <p>
                <button type="button" className="buttonSmall" onClick={()=>{navigate("/login")}}>Already have an account? Login</button>
            </p>
        </div>
    )
}

export default SignUp;