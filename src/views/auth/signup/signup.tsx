import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import { API_SERVER } from '../../../config/constant';

const SignUp = () => {

    const [formFields, updateFields] = useState({
        username: 'username',
        email: 'email',
        password: 'password',
    })

    const navigate = useNavigate()

    const onSubmit = () => {
        try {
            axios.post(API_SERVER + 'users/register', {
                username: formFields.username,
                password: formFields.password,
                email: formFields.email
            }).then(response=>{
                if(response.data.success){
                    console.log(response.data);
                    navigate("/");
                }else{
                    console.log('signup faild!!!');
                }
            });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
             <p>
                <label>Username:</label>
                    <input type="text" onChange={(event)=> {
                        updateFields({
                            username: event.target.value,
                            email: formFields.email,
                            password: formFields.password,
                        });
                    }} value={formFields.username} />
            </p>
            <p>
                <label>Email:</label>
                    <input type="text" onChange={(event)=> {
                        updateFields({
                            username: formFields.username,
                            email: event.target.value,
                            password: formFields.password,
                        });
                    }} value={formFields.email} />
            </p>
            <p>
                <label>Password:</label>
                    <input type="text" onChange={(event)=> {
                        updateFields({
                            username: formFields.username,
                            email: formFields.email,
                            password: event.target.value,
                        });
                    }} value={formFields.password}/>
            </p>
            <p>
                <button type="button" onClick={onSubmit}>Register</button>
            </p>
        </div>
    )
}

export default SignUp;