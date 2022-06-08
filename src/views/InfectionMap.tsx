import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from 'axios';



import AuthGuard from '../components/auth/AuthGuard';
import { UserState } from '../store/reducers/user';
import { API_SERVER } from '../config/constant';
import { Test } from '../config/constant';

import "../map.css";


// Code borrowed from:
//https://codesandbox.io/s/9binx?file=/src/App.js:213-758

const InfectionMap = () => {

    const userToken:string = useSelector((state:UserState) => state.token);

    const initalMapState: Test[] = [];

    const [mapState, updateMap] = useState(initalMapState);

    useEffect(()=>{
        const postInstance = axios.create({
            baseURL: API_SERVER + 'profile/',
            timeout: 1000,
            headers: {'authorization': userToken},
        })

        postInstance.get("getmytests").then( response=>{
            console.log(response);
            const newTests:Test[] = [];

            response.data.tests.forEach( (element:Test) => {
                newTests.push(element);
            });

            
            console.log(newTests);
            updateMap(newTests);
        });

        // Setup live listening for new tests
        const sse = new EventSource('http://localhost:5000/listen')

        sse.addEventListener('newtest', event => {
            console.log('new test');
            
            console.log(event);

            const testID = Number(event.data);
            postInstance.post("gettest", {
                testID: testID,
            }).then((response)=>{
                
            });

        });

        sse.onerror = (e) =>{
            console.log(e);
        }

    }, [userToken]);

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