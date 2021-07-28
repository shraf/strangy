import logo from './logo.svg';
import './App.css';
import io from "socket.io-client";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/header';
import Home from './components/home/home';
import AppRouter from "./components/router/router";
function App() {

  return (
    <div className="App">
      <AppRouter>

        <Home />
      </AppRouter>
    </div>
  );
}

export default App;
