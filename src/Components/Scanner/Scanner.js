import React, { useRef } from 'react'
import './Scanner.css';
import whiteBelt from './whiteBelt.png';
//import Welcome from '../Welcome/Welcome'
import { API } from "aws-amplify";
import { getNinja } from '../../graphql/queries';

function Scanner () {
    const inputRef = useRef(null);

    async function searchNinja(Sbelt) {
        // Get a specific item
        try {
        const oneNinja = await API.graphql({
            query: getNinja,
            variables: { belt: Sbelt }
        });

        if(oneNinja.data.getNinja) {
            welcome();
        } else {
            alert("Ninja not found, please try again!")
            document.getElementById("input").value = "";
        }
        
        } catch (err) {
            console.log(err);
        }
    }

    const scanNFC = async () => {
        document.getElementById("text").innerHTML = "Scanning...";
        inputRef.current.focus()
        //delay(3000, searchNinja(document.getElementById("input").value));
        setTimeout(() => searchNinja(document.getElementById("input").value), 2000);
        
    }   

    const welcome = () => {

    }

    return (
        <div className='container'>
            <img src={whiteBelt} className="ninjaHead" alt=''/>
            <button onClick={scanNFC} className='startScan'></button>
            <p className='text' id="text">Scan your belt Ninja!</p>
            <input id="input" className='name' type='text' autoFocus ref={inputRef}></input>
        </div>
    );
}

export default Scanner;