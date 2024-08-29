import React from 'react'
import Header from "../components/Header/Header";
import SignInSignUp from "../components/SignupSignin/SignInSignUp";
function Signup() {
  return (
    <div>
        <Header/>
        <div className='wrapper'><SignInSignUp/></div>
        </div>
  )
}

export default Signup;