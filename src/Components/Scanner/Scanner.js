import React, { useState, useEffect } from 'react'
import './Scanner.css';
import whiteBelt from './whiteBelt.png';
//import Welcome from '../Welcome/Welcome'
import ninjas from '../RegisteredNinjas/ninjas'
import { API, graphqlOperation } from "aws-amplify";

const initialState = { name: '', belt: '' }

function Scanner () {

    const [message, setMessage] = useState("");

    const delay = (duration) =>
        new Promise(resolve => setTimeout(resolve, duration));

    const handleChange = (event) => {
        setMessage(event.target.value);
        console.log(message)
    };

    const scanNFC = async () => {
        document.getElementById("text").innerHTML = "Scanning...";
        delay(3000)
    }

 
        return (
            <div className='container'>
                <img src={whiteBelt} className="ninjaHead" alt=''/>
                <button onClick={scanNFC} className='startScan'></button>
                <p className='text' id="text">Scan your belt Ninja!</p>
                <input id="input" className='name' type='text' autoFocus onChange={handleChange}></input>
            </div>

        );
}

export default Scanner;