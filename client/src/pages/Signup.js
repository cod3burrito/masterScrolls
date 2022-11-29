import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from "../utils/mutations";
import UserContext from '../utils/UserContext';
import { SAVE_USER } from '../utils/action';
import Auth from '../utils/auth';

const Signup = () => {
    const { setUser } = useContext(UserContext);

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [createUser, { error, data }] = useMutation(ADD_USER); 

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await createUser({
                variables: { ...formState },
            });

            const payload = {
                username: data.createUser.user.username,
                email: data.createUser.user.email,
                _id: data.createUser.user._id,
                campaigns: data.createUser.user.campaigns,
            }

           setUser({
                type: SAVE_USER,
                payload: payload
            });
            
            Auth.login(data.createUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main className=" justify-center mb-4">
            <div className="d-flex justify-content-center ">
                <div style={{ justifyContent: "center" }} className="card">
                    <h4 className="card-header p-2">Sign Up</h4>
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
                                    id='user-input'
                                    value={formState.username}
                                    onChange={handleChange}
                                />
                                <br></br>
                                <p >Email:</p>
                                <input
                                    className="form-input"
                                    placeholder="Your email"
                                    name="email"
                                    type="email"
                                    id='email-input'
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                                <br></br>
                                <p >Password:</p>
                                <input
                                    className="form-input"
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    id='password-input'
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                <br></br>
                                <button
                                    className="btn btn-block btn-info"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                                <br></br>

                            </form>
                        )}
                        <div>
                            <Link className="btn btn-block btn-info"
                                to='/login'>Already have an Account, Login Now!</Link>
                        </div>
                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;
