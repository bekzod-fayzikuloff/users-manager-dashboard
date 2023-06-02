import { createContext, useState } from 'react';
import jwt_decode from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
import { sendData } from '../services/requests';
import { API_URL } from '../config.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() =>
        localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null
    );

    const navigate = useNavigate();

    const logoutUser = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        navigate('/sing-in');
    }

    const loginUser = async (email, password, success, fail) => {
        const loginUrl = `${API_URL}/users/login`;
        try {
            const response = await sendData(loginUrl, {email, password})
            setAuthToken(response.data.accessToken);
            setUser(jwt_decode(response.data.accessToken));
            localStorage.setItem('authToken', JSON.stringify(response.data));
            success();
        } catch (e) {
            fail();
        }
    };


    const registerUser = async (username, email, password, success, fail) => {
        const registerUrl = `${API_URL}/users/register`;
        const userCredentials = {
            username,
            email,
            password,
        };
        try {
            await sendData(registerUrl, userCredentials);
            success()
        } catch (e) {
            fail()
        }
    };


    const contextData = {
        user,
        authToken,
        loginUser,
        registerUser,
        logoutUser
    };

    return (
        <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
    );
};
