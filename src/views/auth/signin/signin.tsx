import React, {useState} from 'react';
import axios from 'axios';
import { API_SERVER } from '../../../config/constant';

const SignIn = () => {

    const [formFields, updateFields] = useState({
        email: 'username',
        password: 'password'
    })

    const onSubmit = () => {
        try {
            axios.post(API_SERVER + 'users/login', {
                password:   formFields.password,
                email: formFields.email
            }).then(response=>{
                if(response.data.success){
                    console.log(response.data);
                }else{
                    console.log('login faild!!!');
                }
            });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <p>
                <label>Email:</label>
                    <input type="text" onChange={(event)=> {
                        updateFields({
                            email: event.target.value,
                            password: formFields.password,
                        });
                    }} value={formFields.email} />
            </p>
            <p>
                <label>Password:</label>
                    <input type="text" onChange={(event)=> {
                        updateFields({
                            email: formFields.email,
                            password: event.target.value,
                        });
                    }} value={formFields.password}/>
            </p>
            <p>
                <button type="button" onClick={onSubmit}>Login</button>
            </p>
        </div>
    )
}

export default SignIn;