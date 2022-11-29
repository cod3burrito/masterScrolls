import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'
const Navbar = () => {
    return (
        <>
            <header>
                <nav className='navbar navbar-expand-lg'>
                    <Link className="navbar-brand" to="/">Home Page</Link>
                    <Link className="campaigns" to="/campaigns">Campaigns</Link>
                    <div id='navbarNav' style={{ marginLeft: "auto" }}>
                        <ul className="navbar-nav">
                            {/* space for other links */}
                            {Auth.loggedIn() ?
                                (<li className="nav-item ">
                                    <Link onClick={Auth.logout} className="nav-link" to="/">Logout</Link>
                                </li>) :
                                (<li className="nav-item ">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>)}

                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar