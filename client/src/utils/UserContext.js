import React, { createContext, useContext } from 'react';

export const UserContext = createContext();
const { Provider } = UserContext;

export const useUser = useContext(UserContext);

export default function UserProvider(props) {
    const initialState = {
        _id: "",
        username: "",
        email: "",
        campaigns: []
    };

    return <Provider value={initialState} {...props} />;
}