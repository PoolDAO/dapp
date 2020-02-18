import React from 'react'
import Summary from './Summary'
import NodeInfo from './NodeInfo'
import NodeList from './NodeList'
import News from './News'
import './style.css'

const Dashboard: React.FC = () => {
  return (
    <div className="container">
      <div className="dashboard-basic-panel">
        <Summary />
        <NodeInfo />
        <NodeList />
      </div>
      <div className="dashboard-lastest-news">
        <News />
      </div>
    </div>
  )
}

export default Dashboard
