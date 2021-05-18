import React, { useEffect, useState, createContext } from 'react';
import AuthService from '../requests/AuthService'

const AuthContext = createContext()

const AuthProvider = (props) => {

    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null)
    const [ssn, setSsn] = useState(null)

    useEffect(()=>{
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData) {
            setToken(storedData.token)
            setSsn(storedData.ssn)
            setRefreshToken(storedData.refreshToken)
        }
    },[])

    const loginRequest = (ssn, password) => {
        AuthService.login(ssn, password).then((x) => {
            setToken(x.payload.accessToken)
            setRefreshToken(x.payload.refreshToken)
            setSsn(ssn)
            localStorage.setItem("userData", JSON.stringify({'token':x.payload.accessToken,ssn,'refreshToken':x.payload.refreshToken}));

        }).catch((err) => {
            alert(err.message)
        })
    }

    const logout = () => {
        setToken(null)
        setSsn(null)
        setRefreshToken(null)
        localStorage.removeItem('userData')
    }

    const refreshTokenRequest = (refreshToken) => {
        AuthService.refreshToken(refreshToken).then((x) => {
            setToken(x.payload.accessToken)
        }).catch((err) => {
            alert(err.message)
        })
    }

    const authProviderValue = {
        loginRequest,
        refreshTokenRequest,
        logout,
        token,
        refreshToken,
        ssn
    };

    return (
        <AuthContext.Provider value={authProviderValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider }