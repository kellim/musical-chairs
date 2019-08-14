import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Game from '../../pages/Game'

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <h1 className="App-title">Automate Musical Chairs</h1>
        <Switch>
          <Route exact path="/" component={Game} />
        </Switch>
      </div>
    </div>
  )
    
}

export default App;
