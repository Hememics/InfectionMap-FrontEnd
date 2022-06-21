import React from "react";
import { Link } from "react-router-dom";

const logo = require('../assets/HeMemics_Logo.png');
const videoBg = require('../assets/HememicsVideoBackground.mp4');

const NavBar = () => {
return (  <div>
            
            <div>
                <video autoPlay loop muted id="video" >
                
                    <source src={videoBg} type='video/mp4' />
                </video>
                <a href="https://hememics.com" >
                    <img src={logo} alt="hememics logo" className="logo"/>
                </a>
                
                
            </div>
        </div>
);
    
    
}


export default NavBar;