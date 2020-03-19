import React, { useEffect, useCallback } from 'react'
import Summary from './Summary'
import NodeList from './NodeList'
import News from './News'

import './style.css'
import useApp, { useAppApi } from '../../service/useApp'
import { Overview } from '../../service/Pooldao'

const Dashboard: React.FC = () => {
  const provider = useApp(state => state.provider)
  const currentAccount = useApp(state => state.currentAccount)
  const ethBalance = useApp(state => state.ethBalance)
  const poolEthBalance = useApp(state => state.poolEthBalance)
  const nodeOverview = useApp(state => state.nodeOverview)
  const forceUpdateOverview = useApp(state => state.forceUpdateOverview)
  const total = useApp(state => state.total)

  const getEthBalance = useCallback(async () => {
    const [ethBalance, poolEthBalance, overview] = await Promise.all<
      string,
      string,
      Overview | null
    >([
      provider.getEthBalance(currentAccount),
      provider.getPoolEthBalance(currentAccount),
      provider.getOverview(currentAccount),
    ])

    useAppApi.setState(state => {
      state.ethBalance = ethBalance
      state.poolEthBalance = poolEthBalance
      if (overview) {
        state.nodeOverview = {
          participate: overview.participate,
          run: overview.run,
          end: overview.end,
          pending: overview.pending,
          pendingsettlement: overview.pendingsettlement,
        }
        state.total = {
          profit: overview.profit,
          deposit: overview.deposit,
          rate: overview.rate,
        }
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
