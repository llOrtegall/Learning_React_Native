import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface AuthContextInterface {
  isAuth: boolean
  setIsAuth: Dispatch<SetStateAction<boolean>>
  logIn: () => void
  logOut: () => void
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const logIn = () => {

  }

  const logOut = () => {

  }

  return (
    <AuthContext.Provider value={{ isAuth, logIn, logOut, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}