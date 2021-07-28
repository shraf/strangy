import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import About from '../about/about';
import Chat from '../chat/chat';
import Header from '../header/header';
import Home from '../home/home';
  
  const AppRouter=()=>{
      return(
          <Router>
                      <Header />

            <Switch>

                <Route exact path="/home" component={Home}/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/chat/:name/:room" render={(props)=><Chat {...props} />}/>
                <Route path="/about" component={About}/>
            </Switch>
          </Router>
      )
  }
  export default AppRouter;