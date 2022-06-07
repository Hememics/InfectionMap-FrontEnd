import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import AuthGuard from '../../components/auth/AuthGuard';
import { UserState } from '../../store/reducers/user';

import { API_SERVER } from '../../config/constant';


type Test = {
    test_id: number;
    test_date: string;
    test_type: string;
    test_result: string;
}

const MyTests = () => {

    const userState:UserState = useSelector((state:UserState)=> state);

    const [testList, updateTestList] = useState([]);
    
    useEffect(()=>{

        const postInstance = axios.create({
            baseURL: API_SERVER + 'profile/',
            timeout: 1000,
            headers: {'authorization': userState.token},
        })

        postInstance.get("getmytests").then( response=>{
            console.log(response);
            const newTests:Test[] = [];

            response.data.tests.forEach( (element:Test) => {
                newTests.push(element);
            });

            
            console.log(newTests);
            updateTestList(newTests);
        });
    }, [userState.token]);

    const addTest = (testType: string, testResult: string) => {
        const postInstance = axios.create({
            baseURL: API_SERVER + 'profile/',
            timeout: 1000,
            headers: {'authorization': userState.token},
        })

        postInstance.post("addtest", {
            "userID": userState.userid,
            "username": userState.username,
            "email": userState.email,
            "test_date": "2022-06-07T16:56:19.936Z",
            "test_type": testType,
            "test_result": testResult,
            "test_location": "on the cloud",
        }).then(response=>{
            
            console.log(response);
        })
    }

    const TestList = () => {

        const genTestJSX = () => {
            const testsJSX: JSX.Element[] = [];

            testList.forEach((test:Test)=>{
                testsJSX.push(
                    <p>{test.test_date} | {test.test_type}:{test.test_result}</p>
                )
            })

            return testsJSX;
        }

        return (
            <div>
                <p>Test list</p>
                <div>{genTestJSX()}</div>
            </div>
                );
    }

    return (
        <AuthGuard>
            <div>
                <p>My tests</p>
                <p><button type="button" onClick={()=>{
                    addTest("testtest", "testresult");
                }}>Create Test Test</button></p>
                <p>
                    <TestList />
                </p>
            </div>
        </AuthGuard>
    );
}


export default MyTests;