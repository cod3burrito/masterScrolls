import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'
import { NPCs } from "fantasy-content-generator";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Navbar = () => {
    const [randomCharacter, setRandomCharacter] = useState({name: "", gender: "", race: "", desires: [], traits: []})
    const [show, setShow] = useState(false);


    const log = () => {
        const {name, gender, race, desires, traits} = {...NPCs.generate().formattedData}
        setRandomCharacter({
            name,
            gender,
            race,
            desires,
            traits
        });

        handleShow();
        
        
    }

    const handleClose = () => {
        setShow(false);
        setRandomCharacter({
            name: "",
            gender: "",
            race: "",
            desires: [],
            traits: []
        });
    }

    const handleShow = () => setShow(true);

    return (
        <>
            <header>
                <nav className='navbar navbar-expand-lg'>                    
                    <div id='navbarNav' style={{ marginLeft: "auto" }}>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="navbar-brand" to="/">Home Page</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={log} className="navbar-brand">Generate Random Character</Link>
                            </li>
                            
                            {Auth.loggedIn() ?
                                (
                                <>    
                                    <li className="nav-item">
                                        <Link className="navbar-brand" to="/campaigns">Campaign Library</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={Auth.logout} className="navbar-brand" to="/">Logout</Link>
                                    </li>                                    
                                </>) :
                                (<li className="nav-item ">
                                    <Link className="navbar-brand" to="/login">Login</Link>
                                </li>)}

                        </ul>
                    </div>
                </nav>
            </header>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Random Character</Modal.Title>                   
                </Modal.Header>
                <Modal.Body>
                    <p>Name: {randomCharacter.name}</p>
                    <p>Race: {randomCharacter.race}</p>
                    <p>Gender: {randomCharacter.gender}</p>
                    <p>Desires:</p>
                    <ul>
                        {randomCharacter.desires.map(desire => <li key={desire}>{desire}</li>)}
                    </ul>
                    <p>Traits</p>
                    <ul>
                        {randomCharacter.traits.map(trait => <li key={trait}>{trait}</li>)}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Navbar