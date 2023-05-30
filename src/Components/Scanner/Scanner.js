import React, { useState } from 'react'
import './Scanner.css';
import whiteBelt from './whiteBelt.png';
import Welcome from '../Welcome/Welcome'
import ninjas from '../RegisteredNinjas/ninjas'
import background from './Background.png'

function Scanner () {
    console.log(ninjas)
    const [message, setMessage] = useState("");
    const [inputFlag, setInputFlag] = useState(false)
    let beltNum = "";
    const delay = (duration) =>
        new Promise(resolve => setTimeout(resolve, duration));

    async function checkIn(beltNum) {
        let success = false;
        for(let key in ninjas) {
            if(beltNum === key) {
                success = true;
                let name = (ninjas[key]);
                document.getElementById("text").innerHTML = "Hello " + name.toString();
                await delay(3000);
                document.getElementById("text").innerHTML = "Scan your belt Ninja!";
            } 
        }
            if(!success) {
                document.getElementById("text").innerHTML = "Ninja not found, please try again!";
                await delay(1000);

                if(window.confirm("Would you like to add a new ninja?")) {
                    //<Add />
                    let newName = prompt("Enter the ninjas name: ");
                    let newBelt = prompt("Scan the belt: ");
                    console.log(newBelt.toString(), newName);
                    ninjas[newBelt] = newName;

                    document.getElementById("text").innerHTML = "Scan your belt Ninja!";
                }
            }
    }

    const handleChange = (event) => {
        setMessage(event.target.value);
        console.log(message)
    };

    const scanNFC = async () => {
        document.getElementById("text").innerHTML = "Scanning...";
        console.log(ninjas);
        setInputFlag(true);
        await delay(3000);
        beltNum = document.getElementById("input").value;
        if(message != null) {
            checkIn(beltNum);
            setInputFlag(false);
        }
    }

    if(inputFlag) {
        return (
            <div className='container'>
                <img src={whiteBelt} className="ninjaHead" alt=''/>
                <button onClick={scanNFC} className='startScan'></button>
                <p className='text' id="text">Scan your belt Ninja!</p>
                <input id="input" className='name' type='text' autoFocus onChange={handleChange}></input>
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