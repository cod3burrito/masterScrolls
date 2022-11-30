import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'
const Navbar = () => {
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
                                <Link className="navbar-brand" to="/campaigns">Campaign Library</Link>
                            </li>
                            {Auth.loggedIn() ?
                                (<li className="nav-item">
                                    <Link onClick={Auth.logout} className="navbar-brand" to="/">Logout</Link>
                                </li>) :
                                (<li className="nav-item ">
                                    <Link className="navbar-brand" to="/login">Login</Link>
                                </li>)}

                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar