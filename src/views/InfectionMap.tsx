import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { LatLngTuple } from "leaflet";

import AuthGuard from '../components/auth/AuthGuard';
import { UserState } from '../store/reducers/user';

import "../map.css";


// Code borrowed from:
//https://codesandbox.io/s/9binx?file=/src/App.js:213-758

const InfectionMap = () => {

    //const userState:UserState = useSelector((state:UserState) => state);

    const position:LatLngTuple = [51.505, -0.09];
    const position2:LatLngTuple = [61.505, -10.09];

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
        
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <Marker position={position2}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>

            </MapContainer>
        </AuthGuard>
      );
}

export default InfectionMap;