import React from 'react'

export default React.createContext({
    // User Auth
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    userLoading: false,
    user: null,
    // Exercises
    //exercises: [],
    //exerciseLoading: false
})