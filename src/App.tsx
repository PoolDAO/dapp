import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Layout from './Layout'
import Dashboard from './components/Dashboard'
import Participant from './components/Participant'
import Conversion from './components/Conversion'
import NodeDetail from './components/NodeDetail'
import OperatorDetail from './components/OperatorDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
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
          <Route path="/operator/:operatorId">
            <OperatorDetail />
          </Route>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
