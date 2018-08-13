import React, { Component } from 'react';
import { Login, SignUp} from './login/login';
import User from './user/user'
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
  // login returns false or user in res,json()
  handleLogin(){
    const username = document.getElementById("login-username").value
    const password = document.getElementById("login-password").value
    fetch(`/api/login`,{
      method:"POST",
      body:JSON.stringify({
        username: username,
        password:password
      }),
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(res => console.log(res.json()) )

  }
  handleSignUp(){
    const username = document.getElementById("signUp-username").value.toString();
    const password = document.getElementById("signUp-password").value.toString();
    const confirm = document.getElementById("signUp-confirm").value.toString();
    const email = document.getElementById("signUp-email").value
    if(password !== confirm){
      console.log("passwords not match");
    }
    else{
      console.log(password);
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
  handleChangeUser(){
    const username = document.getElementById("change-username").value.toString();
    const password = document.getElementById("change-old-password").value.toString();
    const new_password = document.getElementById("change-new-password").value.toString();
    const confirm_password = document.getElementById("change-confirm-password").value
    //make sure its not empty object
    if(new_password !== confirm_password){
      console.log("passwords not match");
    }
    else{
      fetch(`/api/change`,{
        method:"PUT",
        body: JSON.stringify({
            username: username,
            password: password,
            new_password: new_password
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
        <h1> change password below</h1>
        <User handleChangeUser={this.handleChangeUser} />
      </div>
    );
  }
}

export default App;
