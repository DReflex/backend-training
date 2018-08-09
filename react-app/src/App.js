import React, { Component } from 'react';
import { Login, SignUp} from './login/login'
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
    console.log("this is signup ");
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
