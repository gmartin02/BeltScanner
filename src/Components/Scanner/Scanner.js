import React, {useRef, useState } from 'react'
import './Scanner.css';
import whiteBelt from './whiteBelt.png';

function Scanner () {
    return (
        <div className='container'>
            <img src={whiteBelt} className="ninjaHead"/>
            <button className='startScan'></button>
        </div>
        
    );
}

export default Scanner;