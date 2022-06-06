import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import axios from 'axios';


import { API_SERVER } from '../../../config/constant';
import { userLogin } from '../../../store/actions/UserActions';

const SignIn: React.FC<SignInProps> = ({ dispatch }) => {

    const [formFields, updateFields] = useState({
        email: 'username',
        password: 'password'
    })

    const navigate = useNavigate()

    const onSubmit = () => {
        try {
            axios.post(API_SERVER + 'users/login', {
                password:   formFields.password,
                email: formFields.email
            }).then(response=>{
                if(response.data.success){
                    console.log(response.data);
                    dispatch(userLogin(response.data.user.username, response.data.user.email, response.data.token));
                    navigate("/");
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

const connector = connect();

type SignInProps = ConnectedProps<typeof connector>;

export default connector(SignIn);