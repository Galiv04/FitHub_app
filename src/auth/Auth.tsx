// @ts-nocheck
import React, {useEffect, useState} from 'react'
import firebase from '../firebase'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user) => {
            console.log(user)
            setCurrentUser(user)
            setLoading(false)
            if (user) {
                setLogged(true);
            }
            else {
                setLogged(false);
            }
        })  
    }, [])

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                }}
            >
                <h1>Loading User...</h1>
            </div>
        )
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                logged,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
