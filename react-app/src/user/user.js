import React, { Component } from 'react';
import '../App.css';

class User extends Component {
  constructor(props){
    super(props);

    this.handleChangeUser = this.handleChangeUser.bind(this)
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
        }).then(res => (res.status === 422)? false: res.json() )
        .then((user) => {
          if(user){
            alert("succes")
            this.props.history.push("/")
          }
          else{
            alert("error")
          }

        })
      }

  }
  render(){

    return(
      <div>

        <h1> change password below</h1>

        <div className="input-form" >
          <input className="input" id="change-username" placeholder="enter username" type="text" />
          <input className="input" id="change-old-password" placeholder="old password" type="password" />
          <input className="input" id="change-new-password" placeholder="new password" type="password" />
          <input className="input" id="change-confirm-password" placeholder="confirm password" type="password" />
          <button className="button" onClick={this.handleChangeUser} >Change user</button>

        </div>
      </div>
    );
  }
}
export default User
