import React, {useEffect, useState, useCallback} from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from 'axios';



import AuthGuard from '../components/auth/AuthGuard';
import { UserState } from '../store/reducers/user';
import { API_SERVER } from '../config/constant';
import { Test } from '../config/constant';

import "../map.css";


type NewTest = {
    testID: number;
    rendered: boolean;
}

type NewTests = {
    newTests:NewTest[];
    updateMapFunc: () => void;
}

 // Setup live listening for new tests
const sse = new EventSource('http://localhost:5000/listen');

const newTests:NewTests = {newTests:[], updateMapFunc:()=>{}};

sse.addEventListener('newtest', (event)=>{
    console.log(event);
    const testID = Number(event.data);

    const updatedTests:NewTest[] = [];

    newTests.newTests.forEach((t)=>{
        if(!t.rendered){
            updatedTests.push(t);
        }
    });

    updatedTests.push({
        testID: testID,
        rendered: false,
    });

    newTests.newTests = updatedTests;

    newTests.updateMapFunc();

});

sse.onerror = (e) =>{
    console.log(e);
   
}

// Code borrowed from:
//https://codesandbox.io/s/9binx?file=/src/App.js:213-758

const InfectionMap = () => {

    const userToken:string = useSelector((state:UserState) => state.token);
    const userID:string = useSelector((state:UserState) => state.userid);

    const initalMapState: Test[] = [];

    const [mapState, updateMap] = useState(initalMapState);

    useEffect(()=>{
        const postInstance = axios.create({
            baseURL: API_SERVER + 'profile/',
            timeout: 1000,
            headers: {'authorization': userToken},
        });

        postInstance.get("gettests").then( response=>{
            console.log(response);
            const newTests:Test[] = [];

            response.data.tests.forEach( (element:Test) => {
                newTests.push(element);
            });

            
            console.log(newTests);
            updateMap(newTests);
        });
    }, [userToken]);

    newTests.updateMapFunc = ()=>{
        const postInstance = axios.create({
            baseURL: API_SERVER + 'profile/',
            timeout: 1000,
            headers: {'authorization': userToken},
        });


        // Loop through all the new tests
        // for each new test use the ID to request
        // the rest of the test info using the user token
        // and use the reponse to update the map
        newTests.newTests.forEach((t)=>{
            if(!t.rendered){
                t.rendered = true;
                postInstance.post("gettest",{
                    userID: userID,
                    testID: t.testID,
                }).then( response=>{
                    console.log(response);
                    const newTest:Test = response.data.test;
        
                    const newTests:Test[] = [...mapState, newTest];
                    
                    console.log(newTest);
                    updateMap(newTests);
                });
            }
        });
       
    };   


    const genMarkersJSX = () => {
        const markerList:JSX.Element[] = [];
        mapState.forEach(test=>{

            const tl = test.test_location;

            if (tl[0] !== undefined && tl[1] !== undefined && tl[0] !== null && tl[1] !== null){
                markerList.push(
                <Marker key={test._id} position={[tl[0],tl[1]]}>
                    <Popup>
                        Test Type: {test.test_type} <br /> Result: {test.test_result}
                    </Popup>
                </Marker>
                );               
            }
        });
        return markerList;
    }

    return (
        <AuthGuard>
            <MapContainer
            className="markercluster-map"
            center={[51.0, 19.0]}
            zoom={4}
            maxZoom={18}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        
           {genMarkersJSX()}

            </MapContainer>
        </AuthGuard>
      );
}

export default InfectionMap;