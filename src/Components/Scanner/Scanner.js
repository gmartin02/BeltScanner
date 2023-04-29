import React, { useState } from 'react'
import './Scanner.css';
import whiteBelt from './whiteBelt.png';
import Welcome from '../Welcome/Welcome'
import ninjas from '../RegisteredNinjas/ninjas'

function Scanner () {
    const [message, setMessage] = useState("");
    const [inputFlag, setInputFlag] = useState(false)
    let beltNum = "";

    function checkIn(beltNum) {
        for(var key in ninjas) {
            if(beltNum === key) {
                let name = (ninjas[key]);
                document.getElementById("text").innerHTML = "Hello " + name.toString();
            } else {
                document.getElementById("text").innerHTML = "Ninja not found, please try again!";
                //<Add />
            }
        }
    }

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const scanNFC = () => {
        setMessage("");
        document.getElementById("text").innerHTML = "Scanning...";
        setInputFlag(true);
        setTimeout(function() {
            if(message != null) {
                setInputFlag(false);
                beltNum = message;
                checkIn(beltNum);
            }
        }, 3000);
    }

    if(inputFlag) {
        return (
            <div className='container'>
                <img src={whiteBelt} className="ninjaHead" alt=''/>
                <button onClick={scanNFC} className='startScan'></button>
                <p className='text' id="text">Scan your belt Ninja!</p>
                <input className='name' type='text' autoFocus onChange={handleChange}></input>
            </div>

        );
    } else {
        return (
            <div className='container'>
                <img src={whiteBelt} className="ninjaHead" alt=''/>
                <button onClick={scanNFC} className='startScan'></button>
                <p className='text' id="text">Scan your belt Ninja!</p>
            </div>
        );
    }
}

export default Scanner;