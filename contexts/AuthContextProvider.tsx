import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

export interface AuthContextInterface {
  isAuth: boolean
  setIsAuth: Dispatch<SetStateAction<boolean>>
  logIn: () => void
  logOut: () => void
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  console.log(isAuth);

  const logIn = () => {
    setIsAuth(true)
  }

  const logOut = () => {
    setIsAuth(false)
  }

  return (
    <AuthContext.Provider value={{ isAuth, logIn, logOut, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if(!context){
    throw new Error('Context provider not found')
  }

  return context
}