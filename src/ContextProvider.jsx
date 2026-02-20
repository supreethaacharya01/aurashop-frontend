import React , { createContext } from "react";

export const UserContext=createContext();

export default function ContextProvider({children}) {
    const host="http://localhost:7002"
  return (
    <div>
      <UserContext.Provider value={{host}}>
        {children}
      </UserContext.Provider>
    </div>
  )
}
