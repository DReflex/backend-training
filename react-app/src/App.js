import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      login:Boolean,
    }
  }
  componentDidMount(){
    this.setState({
      login: true
    })
  }
  handleLogin(){
    const username = document.getElementById("login-username").value
    const password = document.getElementById("login-password").value
    fetch(`/api/user/${username}`)
    .then(res => (res.status === 404)? null : res.json())
    .then((res) =>{
      if(res){
        (res.password === password)? console.log("you are now logged in"):console.log("invalid password")
      }else{
        console.log("invalid username");
      }
    })
  }
  handleSignUp(){
    console.log("this is signup ");
    const username = document.getElementById("signUp-username").value
    const password = document.getElementById("signUp-password").value
    const confirm = document.getElementById("signUp-confirm").value
    const email = document.getElementById("signUp-email").value
    if(password !== confirm){
      console.log("passwords not match");
    }
    else{
      fetch(`/api/user`,{
        method:"POST",
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(res => (res.status === 422)?console.log("cant create", res):console.log(res.json()) )
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.login?<Login handleLogin={this.handleLogin} />: <SignUp handleSignUp={this.handleSignUp} />}
        <button onClick={
            () => this.setState({
            login : !this.state.login
          })
        }
          >{this.state.login? "Sign up": "Login"}</button>
      </div>
    );
  }
}

export default App;

function Login (props){
  return(
    <div>
      <input id="login-username" placeholder="username" />
      <input id="login-password" placeholder="password" />
      <button onClick={props.handleLogin} >Submit</button>
    </div>
  )
}
function SignUp (props){
  return(
    <div >
      <input id="signUp-username" placeholder="username" />
      <input id="signUp-password" placeholder="password" />
        <input id="signUp-confirm" placeholder="confirm password" />
        <input id="signUp-email" placeholder="email" />
      <button onClick={props.handleSignUp} >Submit</button>

    </div>
  )
}
