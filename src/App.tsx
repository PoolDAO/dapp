import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Participant from './components/Participant';
import Conversion from './components/Conversion';
import NodeDetail from './components/NodeDetail'
import './reset.css'
import './App.css';

function App() {
  return (
    <Router>
      <div className="layout">
        <Header />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/participant">
            <Participant />
          </Route>
          <Route path="/conversion">
            <Conversion />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/node/:nodeId">
            <NodeDetail />
          </Route>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
