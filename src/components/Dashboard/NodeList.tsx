import React from 'react'
import Table from 'rc-table'
import { Link } from 'react-router-dom'
import Progress from '../Progress'
import './nodeList.css'

type TableTabKey = 'running' | 'waiting' | 'cleared'

const NodeList: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<TableTabKey>('running')
  const columnsRunning = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'left' as 'left',
      width: 115,
    },
    {
      title: '开始时间 / 预计结束时间',
      dataIndex: 'duration',
      key: 'duration',
      align: 'left' as 'left',
      width: 270,
      render: (value: string, row: any) => (
        <span>
          {row.startDate}
          <i className="icon-right-arrow" style={{ margin: '0 16px' }} />
          {row.endDate}
        </span>
      ),
    },
    {
      title: '我的充值',
      dataIndex: 'charge',
      key: 'charge',
      align: 'left' as 'left',
      width: 176,
      render: (value: string) => <span className="bold">{value}</span>,
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
        <Link 
          to={`/node/${row.id}`}
          className="table-btn">
          详情
        </Link>
      ),
    },
  ]

  const dataRunning = [
    {
      id: '183474',
      startDate: '2020.02.23',
      endDate: '2020.08.23',
      charge: '142.62536253',
      anticipatedIncome: '42.62536253',
      operator: 'Buildlinks',
    },
  ]

  const columnsWaiting = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'left' as 'left',
      width: 107,
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'left' as 'left',
      width: 131,
    },
    {
      title: '运行周期',
      dataIndex: 'period',
      key: 'period',
      align: 'left' as 'left',
      width: 106,
    },
    {
      title: '当前募集进度',
      dataIndex: 'progress',
      key: 'progress',
      align: 'left' as 'left',
      width: 156,
      render: (value: number) => <Progress percent={value} />,
    },
    {
      title: '我的充值',
      dataIndex: 'charge',
      key: 'charge',
      align: 'left' as 'left',
      width: 150,
      render: (value: string) => <span className="bold">{value}</span>,
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
            style={{ marginRight: '10px' }}>
            详情
          </Link>
          <a href="#" className="table-btn table-btn-danger">
            退款
          </a>
        </React.Fragment>
      ),
    },
  ]

  const dataWaiting = [
    {
      id: '183474',
      startDate: '2020.02.23',
      period: '23天',
      progress: 24,
      charge: 42.62536253,
      operator: 'Buildlinks',
    },
  ]

  const columnsCleared = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'left' as 'left',
      width: 115,
    },
    {
      title: '开始时间 / 预计结束时间',
      dataIndex: 'duration',
      key: 'duration',
      align: 'left' as 'left',
      width: 274,
      render: (value: string, row: any) => (
        <span>
          {row.startDate}
          <i className="icon-right-arrow" style={{ margin: '0 16px' }} />
          {row.endDate}
        </span>
      ),
    },
    {
      title: '我的充值',
      dataIndex: 'charge',
      key: 'charge',
      align: 'left' as 'left',
      width: 176,
      render: (value: string) => <span className="bold">{value}</span>,
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
          <Link 
            to={`/node/${row.id}`}
            className="table-btn">
            详情
          </Link>
        </React.Fragment>
      ),
    },
  ]

  const dataCleared = [
    {
      id: '183474',
      startDate: '2020.02.23',
      endDate: '2020.08.23',
      charge: 142.62536253,
      profit: '+42.62536253',
      annualReturn: '12%',
    },
  ]

  const columnsMap = {
    running: columnsRunning,
    waiting: columnsWaiting,
    cleared: columnsCleared,
  }

  const dataMap = {
    running: dataRunning,
    waiting: dataWaiting,
    cleared: dataCleared,
  }

  const tabs: Array<{ key: TableTabKey; label: string }> = [
    {
      key: 'running',
      label: '运行中',
    },
    {
      key: 'waiting',
      label: '待启动',
    },
    {
      key: 'cleared',
      label: '已清算',
    },
  ]

  const renderEmpty = () => {
    return (
      <div className="table-empty-element">
        <span className="table-empty-icon" />
        内容为空
      </div>
    )
  }

  return (
    <div className="node-list-panel">
      <div className="panel-head">
        <span className="panel-head-title">我的节点</span>
        <ul className="panel-head-tabs">
          {tabs.map(tab => (
            <li
              className={activeTab === tab.key ? 'panel-tab-active' : ''}
              onClick={setActiveTab.bind(null, tab.key)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      <Table
        className="node-list-table"
        columns={columnsMap[activeTab]}
        data={dataMap[activeTab] as any}
        emptyText={renderEmpty()}
      />
    </div>
  )
}

export default NodeList
