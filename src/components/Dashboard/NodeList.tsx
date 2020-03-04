import React, { useEffect, useCallback } from 'react'
import Table, { Column } from 'rc-table'
import { Link } from 'react-router-dom'

import Date from '../Date'
import Amount from '../Amount'
import Progress from '../Progress'
import './nodeList.css'
import useApp, { AppState, useAppApi } from '../../service/useApp'

type TableTabKey = 'preLaunch' | 'staking' | 'completed'

const renderEmpty = () => {
  return (
    <div className="table-empty-element">
      <span className="table-empty-icon" />
      内容为空
    </div>
  )
}

const PreLaunchList: React.FC<{
  data: AppState['nodes'][]
}> = ({ data }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'left' as 'left',
      width: 115,
    },
    {
      title: '开始时间 / 预计结束时间',
      dataIndex: 'time',
      key: 'time',
      align: 'left' as 'left',
      width: 270,
      render: (value: string, row: any) => (
        <span>
          <Date value={row.startTime} format="YYYY-MM-DD" />
          <i className="icon-right-arrow" style={{ margin: '0 16px' }} />
          <Date
            value={row.startTime + row.duration * 30 * 24 * 60 * 60}
            format="YYYY-MM-DD"
          />
        </span>
      ),
    },
    {
      title: '我的充值',
      dataIndex: 'userDepositTotal',
      key: 'userDepositTotal',
      align: 'left' as 'left',
      width: 176,
      render: (value: string) => <Amount value={value} className="bold" />,
    },
    {
      title: '预计收益',
      dataIndex: 'anticipatedIncome',
      key: 'anticipatedIncome',
      align: 'left' as 'left',
      width: 158,
      render: (value: string) => <span className="green bold">{value}</span>,
    },
    {
      title: '运营商',
      dataIndex: 'operator',
      key: 'operator',
      align: 'left' as 'left',
      width: 133,
      render: (value: string) => <a href="#">{value}</a>,
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      align: 'left' as 'left',
      width: 75,
      render: (value: any, row: any) => (
        <Link to={`/node/${row.id}`} className="table-btn">
          详情
        </Link>
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      className="node-list-table"
      columns={columns}
      data={data as any}
      emptyText={renderEmpty()}
    />
  )
}

const StakingList: React.FC<{
  data: AppState['nodes'][]
}> = ({ data }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'left' as 'left',
      width: 107,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      align: 'left' as 'left',
      width: 131,
      render: (value: any) => <Date value={value} format="YYYY-MM-DD" />,
    },
    {
      title: '运行周期',
      dataIndex: 'duration',
      key: 'duration',
      align: 'left' as 'left',
      width: 106,
      render: (value: any) => `${value} 月`,
    },
    {
      title: '当前募集进度',
      dataIndex: 'progress',
      key: 'progress',
      align: 'left' as 'left',
      width: 156,
      render: (value: number, row: any) => (
        <Progress current={row.totalDeposit} target={row.totalDeposit} />
      ),
    },
    {
      title: '我的充值',
      dataIndex: 'userDepositTotal',
      key: 'userDepositTotal',
      align: 'left' as 'left',
      width: 150,
      render: (value: string) => <Amount value={value} className="bold" />,
    },
    {
      title: '运营商',
      dataIndex: 'operator',
      key: 'operator',
      align: 'left' as 'left',
      width: 121,
      render: (value: string) => <a href="#">{value}</a>,
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      align: 'left' as 'left',
      width: 160,
      render: (value: any, row: any) => (
        <React.Fragment>
          <Link
            to={`/node/${row.id}`}
            className="table-btn"
            style={{ marginRight: '10px' }}
          >
            详情
          </Link>
          <a href="#" className="table-btn table-btn-danger">
            退款
          </a>
        </React.Fragment>
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      className="node-list-table"
      columns={columns}
      data={data as any}
      emptyText={renderEmpty()}
    />
  )
}

const CompletedList: React.FC<{
  data: AppState['nodes'][]
}> = ({ data }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'left' as 'left',
      width: 115,
    },
    {
      title: '开始时间 / 预计结束时间',
      dataIndex: 'time',
      key: 'time',
      align: 'left' as 'left',
      width: 274,
      render: (value: string, row: any) => (
        <span>
          <Date value={row.startTime} format="YYYY-MM-DD" />
          <i className="icon-right-arrow" style={{ margin: '0 16px' }} />
          <Date
            value={row.startTime + row.duration * 30 * 24 * 60 * 60}
            format="YYYY-MM-DD"
          />
        </span>
      ),
    },
    {
      title: '我的充值',
      dataIndex: 'userDepositTotal',
      key: 'userDepositTotal',
      align: 'left' as 'left',
      width: 176,
      render: (value: string) => <Amount value={value} className="bold" />,
    },
    {
      title: '我的收益',
      dataIndex: 'profit',
      key: 'profit',
      align: 'left' as 'left',
      width: 158,
      render: (value: string) => <span className="green bold">{value}</span>,
    },
    {
      title: '年化收益',
      dataIndex: 'annualReturn',
      key: 'annualReturn',
      align: 'left' as 'left',
      width: 133,
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      align: 'left' as 'left',
      width: 75,
      render: (value: any, row: any) => (
        <React.Fragment>
          <Link to={`/node/${row.id}`} className="table-btn">
            详情
          </Link>
        </React.Fragment>
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      className="node-list-table"
      columns={columns}
      data={data as any}
      emptyText={renderEmpty()}
    />
  )
}

const NodeList: React.FC = () => {
  const provider = useApp(state => state.provider)
  const myNodeList = useApp(state => state.myNodeList)
  const currentAccount = useApp(state => state.currentAccount)
  const [activeTab, setActiveTab] = React.useState<TableTabKey>('preLaunch')

  const tabs: Array<{
    key: TableTabKey
    label: string
    includeStatus: string[]
  }> = [
    {
      key: 'preLaunch',
      label: '运行中',
      includeStatus: ['start', 'raising', 'preLaunch'],
    },
    {
      key: 'staking',
      label: '待启动',
      includeStatus: ['staking', 'pendingSettlement'],
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
      state.myNodeList = result
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
