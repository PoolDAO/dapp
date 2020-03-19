import React, { useCallback, useEffect } from 'react'
import useApp, { useAppApi } from '../../service/useApp'
import CompletedList from './CompletedList'

import BN from 'bn.js'
import './nodeList.css'
import PreLaunchList from './PreLaunchList'
import StakingList from './StakingList'

type TableTabKey = 'preLaunch' | 'staking' | 'completed' | 'pendingsettlement'

const NodeList: React.FC<{ data: any }> = ({ data }) => {
  const provider = useApp(state => state.provider)
  const myNodeList = useApp(state => state.myNodeList)
  const currentAccount = useApp(state => state.currentAccount)
  const forceUpdateNodeList = useApp(state => state.forceUpdateNodeList)
  const [activeTab, setActiveTab] = React.useState<TableTabKey>('staking')

  const tabs: Array<{
    key: TableTabKey
    label: string
    includeStatus: string[]
  }> = [
    {
      key: 'staking',
      label: '运行中',
      includeStatus: ['staking'],
    },
    {
      key: 'preLaunch',
      label: '待启动',
      includeStatus: ['start', 'raising', 'prelaunch'],
    },
    {
      key: 'pendingsettlement',
      label: '待清算',
      includeStatus: ['pendingsettlement'],
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
    pendingsettlement: CompletedList,
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
        const withdrawMap = node.withdrawList.reduce((r: any, c: any) => {
          const value = new BN(c.value)
          if (!r[c.addr]) {
            r[c.addr] = value
          } else {
            r[c.addr] = value.add(r[c.addr])
          }
          return r
        }, {} as any)

        const depositMap = node.depositList.reduce((r: any, c: any) => {
          const value = new BN(c.value)
          if (!r[c.addr]) {
            r[c.addr] = value
          } else {
            r[c.addr] = value.add(r[c.addr])
          }
          return r
        }, {} as any)

        const myDeposit =
          node.owner === currentAccount
            ? node.operatorDeposit
            : depositMap[currentAccount] || 0

        const currentProfit = (withdrawMap[currentAccount] || new BN(0))
          .sub(new BN(myDeposit))
          .toString()
        const estimatedProfit = new BN(myDeposit)
          .mul(new BN(node.duration))
          .div(new BN(120))
          .toString()

        // 充值金额*（预计年化10%（周期时间/年周期
        // console.log(currentProfit)
        return {
          ...node,
          currentProfit,
          myDeposit,
          estimatedProfit,
        }
      })
    })
  }, [provider, currentAccount, forceUpdateNodeList])

  useEffect(() => {
    getNodeInfoList()
  }, [getNodeInfoList])

  return (
    <div>
      <div className="node-info-panel">
        <ul className="node-info">
          <li>
            <p>{data.participate}</p>
            <p>共参与节点数</p>
          </li>
          <li className="cursor" onClick={setActiveTab.bind(null, 'staking')}>
            <p>{data.run}</p>
            <p>运行中节点数</p>
          </li>
          <li className="cursor" onClick={setActiveTab.bind(null, 'preLaunch')}>
            <p>{data.pending}</p>
            <p>待启动节点数</p>
          </li>
          <li className="cursor" onClick={setActiveTab.bind(null, 'pendingsettlement')}>
            <p>{data.pendingsettlement}</p>
            <p>待清算节点数</p>
          </li>
          <li className="cursor" onClick={setActiveTab.bind(null, 'completed')}>
            <p>{data.end}</p>
            <p>已清算节点数</p>
          </li>
        </ul>
      </div>
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
    </div>
  )
}

export default NodeList
