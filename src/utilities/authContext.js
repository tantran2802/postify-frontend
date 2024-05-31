// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loginState, setLoginState] = useState(false);
    const localToken = localStorage.getItem('token')
    function checkingToken(){
        localToken != null || localToken != undefined ? (
            fetch('http://localhost:3001/auth/valid',{
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${localToken}`
                }
            }).then((data) => data.json()).then((validState) => {
                if(validState.valid == 'Valid') setLoginState(true)
                else if (validState.valid == 'TokenExpiredError') setLoginState(false)
                else if (validState.valid == 'Invalid token') setLoginState(false)
            }).catch((e) => console.log(e))
        ) : setLoginState(false) 
    }
    useEffect(() => {
        checkingToken();
    })

  return (
    <AuthContext.Provider value={{ loginState }}>
      {children}
    </AuthContext.Provider>
  );
};
