import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Game from '../../pages/Game'

function App() {
  return (
    <div className="App">
      <h1 className="App-title">Musical Chairs: Automated</h1>
      <Switch>
        <Route exact path="/" component={Game} />
      </Switch>
    </div>
  )
    
}

export default App;
