import React from 'react';
import './login.css';


function Login (props){
  return(
    <div className="input-form">
      <input className="input" id="login-username" placeholder="username" type="text" />
      <input className="input" id="login-password" placeholder="password" type="password" />
      <button className="button" onClick={props.handleLogin} >Login</button>
    </div>
  )
}
function SignUp (props){
  return(
    <div className="input-form" >
      <input className="input" id="signUp-username" placeholder="username" type="text" />
      <input className="input" id="signUp-password" placeholder="password" type="password" />
        <input className="input" id="signUp-confirm" placeholder="confirm password" type="password" />
        <input className="input" id="signUp-email" placeholder="email" type="email" />
      <button className="button" onClick={props.handleSignUp} >SignUp</button>

    </div>
  )
}
export {
  Login,
  SignUp
}
