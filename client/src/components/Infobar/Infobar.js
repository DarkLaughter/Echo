import React from 'react'
import onlineIcon from "../../icons/onlineIcon.png"

import './Infobar.css'

const Infobar = ( {room} ) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img src={onlineIcon} alt="online" className="onlineIcon"/>
                <h3>Room Name: {room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"> Leave Room 
                </a>
            </div>
        </div>
    )
}

export default Infobar;
