import React, { useEffect, useState } from 'react'
import Table from 'rc-table'
import { useHistory, useParams } from 'react-router-dom'

import useApp from '../../service/useApp'
import { NodeInfo } from '../../service/Pooldao'
import './style.css'
import Amount from '../Amount'
import Date from '../Date'
import Spinner from '../Spinner'

type TableTabKey = 'depositList' | 'chargeList' | 'statusList'

const NodeDetail: React.FC = () => {
  const provider = useApp(state => state.provider)
  const params: any = useParams()

  const [activeTab, setActiveTab] = useState<TableTabKey>('depositList')
  const [data, setData] = useState<NodeInfo>()
  const history = useHistory()

  useEffect(() => {
    provider.getNodeDetail(params.nodeId).then(result => {
      setData(result)
    })
  }, [provider])

  if (!data)
    return (
      <div className="spinner-center">
        <Spinner />
      </div>
    )

  const fiancialData = [
    {
      name: '运营商充值金额',
      value: <Amount value={data.operatorDeposit} postfix="ETH" />,
    },
    {
      name: '用户充值金额',
      value: <Amount value={data.userDepositTotal} postfix="ETH" />,
    },
    {
      name: '最小充值金额',
      value: <Amount value={data.minShardingDeposit} postfix="ETH" />,
    },
    {
      name: '最大充值金额',
      value: <Amount value={data.depositCapacity} postfix="ETH" />,
    },
    {
      name: '节点盈利金额',
      value: <Amount value={data.reward} postfix="ETH" />,
    },
    { name: '节点周期', value: `${data.duration} 月` },
    {
      name: '运营商运营手续费',
      value: <Amount value={data.ownerFee} postfix="ETH" />,
    },
    {
      name: '运营手续费率',
      value: <Amount value={data.ownerFee} postfix="ETH" />,
    },
    {
      name: '协议手续费金额',
      value: <Amount value={data.daoFee} postfix="ETH" />,
    },
    {
      name: '协议手续费率',
      value: <Amount value={data.daoFee} postfix="ETH" />,
    },
    {
      name: '生态合作方手续费金额',
      value: <Amount value={data.partnerFee} postfix="ETH" />,
    },
    { name: '', value: '' },
  ]

  const operatorInfo = [
    { name: '运营商地址', value: 'Buildlinks', color: '#0080FF' },
    {
      name: '运营商合作地址',
      value: '0x4b9d7504014bC1810572979739EA00317c80308a',
    },
    { name: '生态合作方', value: 'Buildlinks' },
    { name: '协议方', value: 'Buildlinks' },
    {
      name: 'validator pub key',
      value:
        '0450863ad64a87ae8a2fe83c1af1a8403cb53f53e486d8511dad8a04887e5b23522cd470243453a299fa9e77237716103abc11a1df38855ed6f2ee187e9c582ba6',
    },
    {
      name: 'validator signature',
      value:
        '0450863ad64a87ae8a2fe83c1af1a8403cb53f53e486d8511dad8a04887e5b23522cd470243453a299fa9e77237716103abc11a1df38855ed6f2ee187e9c582ba6',
    },
    {
      name: 'withdrawal credentials',
      value: '0x4b9d7504014bC1810572979739EA00317c80308a',
    },
    { name: 'deposit data', value: '2020.02.21' },
  ]

  const depositListColumns = [
    {
      title: '公钥',
      dataIndex: 'addr',
      key: 'addr',
      align: 'left' as 'left',
      width: 200,
      render: (value: any) => {
        return (
          <span className="ellipsis" style={{ width: 150 }}>
            {value}
          </span>
        )
      },
    },
    {
      title: '金额(ETH)',
      dataIndex: 'value',
      key: 'value',
      align: 'left' as 'left',
      width: 156,
      render: (value: any) => {
        return <Amount value={value} />
      },
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      align: 'right' as 'right',
      width: 184,
      render: (value: any) => {
        return <Date value={value} />
      },
    },
  ]

  const chargeListColumns = depositListColumns

  const statusListColumns = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'left' as 'left',
      width: 400,
      render: (value: string) => <span className="bold">{value}</span>,
    },
    {
      title: '时间',
      dataIndex: 'dateTime',
      key: 'dateTime',
      align: 'right' as 'right',
      width: 141,
    },
  ]

  const depositListData = data.depositList

  const chargeListData = data.withdrawList

  const statusListData = [
    { status: '待启动', dateTime: '2020.01.21 16:24:45' },
    { status: '待启动', dateTime: '2020.01.21 16:24:45' },
    { status: '待启动', dateTime: '2020.01.21 16:24:45' },
    { status: '运行中', dateTime: '2020.01.21 16:24:45' },
    { status: '运行中', dateTime: '2020.01.21 16:24:45' },
    { status: '已清算', dateTime: '2020.01.21 16:24:45' },
  ]

  const columnsMap = {
    depositList: depositListColumns,
    chargeList: chargeListColumns,
    statusList: statusListColumns,
  }

  const dataMap = {
    depositList: depositListData,
    chargeList: chargeListData,
    statusList: statusListData,
  }

  const tableTabs: Array<{ title: string; key: TableTabKey }> = [
    { title: '充值列表', key: 'depositList' },
    { title: '结算金额', key: 'chargeList' },
    { title: '状态变更列表', key: 'statusList' },
  ]

  return (
    <div className="container">
      <div className="node-detail-panel">
        <div
          className="back-icon"
          onClick={() => {
            history.goBack()
          }}
        />
        <h2>节点详情</h2>
        <section className="node-detail-grid">
          {fiancialData.map(dataItem => (
            <div className="node-detail-grid-item" key={dataItem.name}>
              <p className="node-detail-title">{dataItem.name}</p>
              <span className="node-detail-value">{dataItem.value}</span>
            </div>
          ))}
        </section>
        <section className="node-operator-info">
          <ul>
            {operatorInfo.map(info => (
              <li>
                <span>{info.name}</span>
                <span style={{ color: info.color ? info.color : 'inherit' }}>
                  {info.value}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="node-investment-info">
          <div className="node-investment-tabs">
            {tableTabs.map(tab => (
              <div
                className={`node-investment-tab${
                  activeTab === tab.key ? ' node-investment-tab-active' : ''
                }`}
                onClick={setActiveTab.bind(null, tab.key)}
              >
                {tab.title}
              </div>
            ))}
          </div>
          <Table
            className="node-investment-table"
            columns={columnsMap[activeTab]}
            data={dataMap[activeTab] as any}
          />
        </section>
      </div>
    </div>
  )
}

export default NodeDetail
