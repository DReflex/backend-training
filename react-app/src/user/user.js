import React from "react";

function User (props){
  return(
    <div className="input-form" >
      <input className="input" id="change-username" placeholder="enter username" type="text" />
      <input className="input" id="change-old-password" placeholder="old password" type="password" />
        <input className="input" id="change-new-password" placeholder="new password" type="password" />
        <input className="input" id="change-confirm-password" placeholder="confirm password" type="password" />
      <button className="button" onClick={props.handleChangeUser} >Change user</button>

    </div>
  )
}
export default User
