import React from 'react'
import videoBG from '../assets/paper.mp4'

const videoBG = () => {return (
    <video autoPlay id='pikapaper'>
        <source src='{videoBG}' type='video/mp4' />
    </video>
)}

function Home() {
    return (
        <div className='welcome'><h1> Welcome, mortal! </h1>
            <p> Please identify yourself in our ranks or request to join us.See the appropriate links above.</p></div>
    )
}

export default Home