import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Chat from '../chat/chat';
import Home from '../home/home';
  
  const AppRouter=()=>{
      return(
          <Router>
            <Switch>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/chat/:name/:room" render={(props)=><Chat {...props} />}/>

            </Switch>
          </Router>
      )
  }
  export default AppRouter;