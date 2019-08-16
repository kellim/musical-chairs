import React from 'react';
import { Route, Switch } from 'react-router-dom'
import NavBar from '../NavBar'
import About from '../../pages/About'
import Game from '../../pages/Game'
import './App.css';


function App() {
  return (
    <div className="App">
      <div className="App-container">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Game} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </div>
  )
    
}

export default App;
