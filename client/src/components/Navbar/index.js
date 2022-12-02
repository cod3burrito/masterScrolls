import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'
import { NPCs } from "fantasy-content-generator";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Navbar() {
    const [randomCharacter, setRandomCharacter] = useState({ name: "", gender: "", race: "", desires: [], traits: [] });
    const [show, setShow] = useState(false);

    const logoStyle = {
        width: 600,
        height: 50,
        justifyContent: 'flex-end'
    }

    const log = () => {
        const { name, gender, race, desires, traits } = NPCs.generate().formattedData;
        setRandomCharacter({
            name,
            gender,
            race,
            desires,
            traits
        });

        handleShow();


    };

    const handleClose = () => {
        setShow(false);
        setRandomCharacter({
            name: "",
            gender: "",
            race: "",
            desires: [],
            traits: []
        });
    };

    const handleShow = () => setShow(true);

    return (
        <>
            <header>
                <nav className='navbar navbar-expand-lg'>
                <logo className="navbar-brand">
                    <img src="./masterScrollsLogo.png" alt="logo for Master Scrolls in purple text" style={logoStyle}></img>
                </logo>
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
            <Modal style={{ "--bs-modal-bg": "#F2B644" }} show={show} onHide={handleClose}>
                <Modal.Header style={{ "--bs-modal-header-border-color": "#140600" }} closeButton>
                    <Modal.Title>You Summoned</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5>Name</h5>
                            <p>{randomCharacter.name}</p>
                        </div>
                        <div>
                            <h5>Race</h5>
                            <p>{randomCharacter.race}</p>
                        </div>
                        <div>
                            <h5>Gender</h5>
                            <p>{randomCharacter.gender}</p>
                        </div>
                    </div>
                    <h5 className="text-center mt-2">Desires</h5>
                    <ul className="list-group">
                        {randomCharacter.desires.map(desire => <li className="list-group-item" style={{backgroundColor: "#F2B644", borderColor: "#140600" }} key={desire}>{desire}</li>)}
                    </ul>
                    <h5 className="mt-2 text-center">Traits</h5>
                    <ul className="list-group">
                        {randomCharacter.traits.map(trait => <li className="list-group-item" style={{backgroundColor: "#F2B644", borderColor: "#140600" }} key={trait}>{trait}</li>)}
                    </ul>
                </Modal.Body>
                <Modal.Footer style={{ "--bs-modal-footer-border-color": "#140600" }}>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Navbar