import LoginForm from 'components/LoginForm/LoginForm'
import React from 'react'

interface ILogin {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  loggedIn: boolean
  setLoggedInUser: React.Dispatch<React.SetStateAction<string>>
  loggedInUser: string
}

const Login = ({setLoggedIn, loggedIn, loggedInUser, setLoggedInUser}: ILogin) => {
  return (
    <>
      <h1 className="text-center mt-5 pt-3">Login de Usuario</h1>
      <LoginForm
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
    </>
  )
}

export default Login
