import React, { useEffect, useCallback } from 'react'
import Summary from './Summary'
import NodeList from './NodeList'
import News from './News'

import './style.css'
import useApp, { useAppApi } from '../../service/useApp'

const Dashboard: React.FC = () => {
  const provider = useApp(state => state.provider)
  const currentAccount = useApp(state => state.currentAccount)
  const ethBalance = useApp(state => state.ethBalance)
  const poolEthBalance = useApp(state => state.poolEthBalance)
  const nodeOverview = useApp(state => state.nodeOverview)
  const forceUpdateOverview = useApp(state => state.forceUpdateOverview)
  const total = useApp(state => state.total)

  const getEthBalance = useCallback(async () => {
    const result = await provider.getOverview(currentAccount)

    useAppApi.setState(state => {
      state.ethBalance = result.ethBalance
      state.poolEthBalance = result.poolEthBalance
      state.nodeOverview = {
        participate: result.participate,
        run: result.run,
        end: result.end,
        pending: result.pending,
      }
      state.total = {
        profit: result.profit,
        deposit: result.deposit,
        rate: result.rate,
      }
    })
  }, [provider, currentAccount])

  useEffect(() => {
    getEthBalance()
  }, [getEthBalance, forceUpdateOverview])

  return (
    <div className="container">
      <div className="dashboard-basic-panel">
        <Summary
          data={{
            ethBalance,
            poolEthBalance,
            ...total,
          }}
        />
        <NodeList data={nodeOverview} />
      </div>
      <div className="dashboard-lastest-news">
        <News />
      </div>
    </div>
  )
}

export default Dashboard
