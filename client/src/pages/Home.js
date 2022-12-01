import React, { useEffect } from 'react'
import Eevee from './Background.js'
import Pretty from './style/home.css'

// useEffect(() => {
//     const timer = setTimeoutconst timer = setTimeout(() => {
//         setCount(timer);}, 4000);
//         return () => clearTimeout(timer);
// , [];)}


function Home() {
    return (
        <div className='joseph'><Eevee></Eevee>
            <div className='welcome' style={Pretty}><h1> Welcome, mortal! </h1>
        <p> Please identify yourself in our ranks or request to join us. See the appropriate links above.</p></div>
        </div>
        
    )
};

export default Home