import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'
import UserContext from '../utils/UserContext';
import { SAVE_USER } from '../utils/action';

import Auth from '../utils/auth'

const Login = () => {
    const { setUser } = useContext(UserContext);

    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event => {
        const { name, value } = event.target
        setFormState({
            ...formState,
            [name]: value,
        });
    })

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { ...formState }
            });

            const payload = {
                username: data.login.user.username,
                email: data.login.user.email,
                _id: data.login.user._id,
                campaigns: data.login.user.campaigns,
            }

            setUser({
                type: SAVE_USER,
                payload: payload
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e)
        }

        setFormState({
            username: '',
            password: '',
        });
    }

    const styles = {
        button: {
            backgroundColor: "#C19AB9",
            padding: ".25%",
            margin: ".5%",
            width: "8rem",
            border: "0px",
            color: "#140600"
        },
        createBtn: {
            backgroundColor: "#C19AB9",
            padding: ".25%",
            margin: ".5%",
            width: "10rem",
            border: "0px",
            color: "#140600"
        },
        background: {
            backgroundColor: "#F2B644"
        },
        modalBtn: {
            backgroundColor: "#A650D1",
            border: "0px"
        }
    }
    
    return (
        <main className='justify-center mb-4'>
            <div className='d-flex justify-content-center'>
                <div style={{ ...styles.background, justifyContent: "center", width: "350px"}} className="card">
                    <h4 className="card-header p-2">Login</h4>
                    <div className="card-body">
                        {data ? (
                            <Navigate to="/campaigns" />
                        ) : (
                            <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleFormSubmit}>
                                <p >Username:</p>
                                <input
                                    className="form-input"
                                    placeholder="Your username"
                                    name="username"
                                    type="username"
                                    id='username-input'
                                    value={formState.username}
                                    onChange={handleChange}
                                />
                                <br></br>

                                <p >Password:</p>
                                <input
                                    className="form-input"
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                <br></br>
                                <div className="d-flex flex-wrap justify-content-center">
                                    <button
                                        className="btn btn-block btn-info"
                                        style={{ ...styles.button, cursor: 'pointer' }}
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                    
                                    <Link className="btn btn-block btn-info"
                                    to='/signup' style={{ ...styles.button, cursor: 'pointer' }}>Sign up Now!</Link>
                                </div>
                                    {error && (
                                <div className="my-3 p-3 bg-danger text-white">
                                    {error.message}
                                </div>
                        )}
                                <br></br>
                            </form>
                        )}                        
                    </div>
                </div>
            </div>
        </main>
    )
}


export default Login