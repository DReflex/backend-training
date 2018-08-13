import React from 'react';
import User from './user/user'
import App from './App'
import { Switch, Route } from 'react-router-dom';

class RouterApp extends React.Component{
  render(){
    return(
      <div>
        <Switch>
          <Route exact path='/' component={App} />
          <Route path='/user' component={User} />
        </Switch>
      </div>
    )
  }
}
export default RouterApp
