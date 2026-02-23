import React , { createContext } from "react";

export const UserContext=createContext();

export default function ContextProvider({children}) {
    const host="https://aurashop-backend-s3ua.onrender.com"
  return (
    <div>
      <UserContext.Provider value={{host}}>
        {children}
      </UserContext.Provider>
    </div>
  )
}
