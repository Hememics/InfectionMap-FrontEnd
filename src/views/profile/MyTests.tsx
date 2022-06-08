import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import AuthGuard from '../../components/auth/AuthGuard';
import { UserState } from '../../store/reducers/user';

import { API_SERVER } from '../../config/constant';
import { Test } from '../../config/constant';



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
            "test_location_lat": (Math.random() * (84 + 84)) - 84,
            "test_location_lon": Math.random() * 400,
        }).then(response=>{
            
            console.log(response);
        })
    }

    const TestList = () => {

        const genTestJSX = () => {
            const testsJSX: JSX.Element[] = [];

            testList.forEach((test:Test)=>{
                console.log("id:");
                console.log(test._id);
                testsJSX.push(
                    <p key={test._id}>{test.test_date} | {test.test_type}:{test.test_result}</p>
                )
            })

            return <div>{testsJSX}</div>;
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
                <div>
                    <TestList />
                </div>
            </div>
        </AuthGuard>
    );
}


export default MyTests;