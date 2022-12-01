import React from 'react'
import Eevee from './Background.js'

function Home() {
    return (
        <div><Eevee></Eevee>
            <div className='welcome' style={{position: 'absolute', 'text-align': 'center',}}><h1> Welcome, mortal! </h1>
        <p> Please identify yourself in our ranks or request to join us. See the appropriate links above.</p></div>
        </div>
        
    )
}

export default Home