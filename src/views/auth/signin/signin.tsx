import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import axios from 'axios';


import { API_SERVER } from '../../../config/constant';
import { userLogin } from '../../../store/actions/UserActions';

import '../../../hememics.css';
import { latLngBounds } from 'leaflet';

const SignIn: React.FC<SignInProps> = ({ dispatch }) => {

    const [formFields, updateFields] = useState({
        email: 'email',
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
        <div className='center'>
            <p>
                <button className='label'><p>Email</p>

                    <input type="text" onChange={(event)=> {
                        updateFields({
                            email: event.target.value,
                            password: formFields.password,
                            error: '',
                        });
                    }} value={formFields.email} />
                
            
                <p>Password</p>
                    <input type="password" onChange={(event)=> {
                        updateFields({
                            email: formFields.email,
                            password: event.target.value,
                            error: '',
                        });
                    }} value={formFields.password}/>
                </button>
            </p>
            <div>
            {showError(formFields.error)}
            </div>
            <p>
                <button type="button" onClick={onSubmit}>Login</button>
            </p>
            <p>
                <button type="button" onClick={()=>{navigate("/register")}}>Register</button>
            </p>
        </div>
    )
}

const connector = connect();

type SignInProps = ConnectedProps<typeof connector>;

export default connector(SignIn);