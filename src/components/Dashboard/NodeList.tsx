import React, { useCallback, useEffect } from 'react'
import useApp, { useAppApi } from '../../service/useApp'
import CompletedList from './CompletedList'

import BN from 'bn.js'
import './nodeList.css'
import PreLaunchList from './PreLaunchList'
import StakingList from './StakingList'

type TableTabKey = 'preLaunch' | 'staking' | 'completed'

const NodeList: React.FC = () => {
  const provider = useApp(state => state.provider)
  const myNodeList = useApp(state => state.myNodeList)
  const currentAccount = useApp(state => state.currentAccount)
  const [activeTab, setActiveTab] = React.useState<TableTabKey>('staking')

  const tabs: Array<{
    key: TableTabKey
    label: string
    includeStatus: string[]
  }> = [
    {
      key: 'staking',
      label: '运行中',
      includeStatus: ['staking', 'pendingsettlement'],
    },
    {
      key: 'preLaunch',
      label: '待启动',
      includeStatus: ['start', 'raising', 'prelaunch'],
    },
    {
      key: 'completed',
      label: '已清算',
      includeStatus: ['completed', 'revoked'],
    },
  ]

  const nodeMap = {
    preLaunch: PreLaunchList,
    staking: StakingList,
    completed: CompletedList,
  }

  const List = nodeMap[activeTab]

  const filterData = myNodeList.filter(({ status }) => {
    const lowerStatus = status.toLowerCase()
    const findTab = tabs.find(({ includeStatus }) =>
      includeStatus.includes(lowerStatus)
    )

    return findTab?.key === activeTab
  })

  const getNodeInfoList = useCallback(async () => {
    const result = await provider.getMyNodeList(currentAccount)
    useAppApi.setState(state => {
      state.myNodeList = result.map(node => {
        const myDeposit =
          node.owner === currentAccount
            ? node.operatorDeposit
            : node.userDepositTotal
        const estimatedProfit = new BN(myDeposit).div(new BN('20')).toString()

        return {
          ...node,
          myDeposit,
          estimatedProfit,
        }
      })
    })
  }, [provider, currentAccount])

  useEffect(() => {
    getNodeInfoList()
  }, [getNodeInfoList])

  return (
    <div className="node-list-panel">
      <div className="panel-head">
        <span className="panel-head-title">我的节点</span>
        <ul className="panel-head-tabs">
          {tabs.map(tab => (
            <li
              key={tab.key}
              className={activeTab === tab.key ? 'panel-tab-active' : ''}
              onClick={setActiveTab.bind(null, tab.key)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
      <List data={filterData} />
    </div>
  )
}

export default NodeList
