import React, { Component } from 'react';
import { Login, SignUp} from './login/login';
import './App.css';
// this.props.history.push("/")

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      login:Boolean,
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }
  componentDidMount(){
    this.setState({
      login: true
    })
  }
  // login returns false or user in res,json()
  handleLogin(){
    //would use state to keep track of the input but this will serve
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
    }).then(res => res.json() )
    .then((data) =>{
      if(!data){
        document.getElementById("login-username").value = "";
        document.getElementById("login-password").value = "";
        alert("wrong username / password");
      }else{
        this.props.history.push("/user")

      }
    } )

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
      }).then(res => (res.status === 422)? false :res.json() )
      .then((user) => {
        if(user){
          alert("succes")
          this.props.history.push("/user")
        }
        else{
          alert("error")
        }

      })
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
