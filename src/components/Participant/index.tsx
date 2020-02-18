import React from 'react'
import Table from 'rc-table'
import Tooltip from 'rc-tooltip'
import { Link } from 'react-router-dom'
import Progress from '../Progress'
import WalletDialog from '../Wallet'
import InvestDialog from '../Invest'
import './style.css'

type SortIconType = 'asce' | 'desc' | null
interface TableSortIconProps {
  status: SortIconType
}

const TableSortIcon: React.FC<TableSortIconProps> = ({ status }) => {
  return (
    <div className="table-sort-icon">
      <span
        className={`table-sort-up ${
          status === 'asce' ? ' table-sort-active' : ''
        }`}
      />
      <span
        className={`table-sort-down${
          status === 'desc' ? ' table-sort-active' : ''
        }`}
      />
    </div>
  )
}

const Participant: React.FC = () => {
  const [sortBy, setSortBy] = React.useState<{key: string | null, status: SortIconType}>({ key: null, status: null })
  const [walletDialogVisible, setWalletDialogVisible] = React.useState(false)
  const [investDialogVisible, setInvestDialogVisible] = React.useState(false)

  const renderOperatorTip = (row: any) => {
    const { operator, operatorFame, operatorNodes } = row
    return (
      <div className="operator-tooltip">
        <div className="operator-tooltip-column">
          <span className="bold">{operator}</span>
          <p>运营商名称</p>
        </div>
        <div className="operator-tooltip-column">
          <span className="bold">{operatorFame}</span>
          <p>声誉值</p>
        </div>
        <div className="operator-tooltip-column">
          <span className="bold">{operatorNodes} 个</span>
          <p>累计运营节点</p>
        </div>
      </div>
    )
  }

  const updateTableSort = (dataKey: string) => {
    if (dataKey === sortBy.key) {
      const newStatus = (sortBy.status === 'asce') 
        ? 'desc'
        : (sortBy.status === 'desc') 
          ? null
          : 'asce'
      setSortBy({ key: dataKey, status: newStatus })
    } else {
      setSortBy({ key: dataKey, status: 'asce' })
    }
  }

  let data = [
    {
      id: '183474',
      startDate: '2020.02.23',
      period: '23 天',
      collected: '42.62536253',
      collectedProgress: 24,
      operator: 'Buildlinks',
      operatorFame: 89.23,
      operatorNodes: 12,
      rate: 2,
      identifier: '0x4b72392347923439739',
    },
    {
      id: '183474',
      startDate: '2020.02.23',
      period: '23 天',
      collected: '42.62536253',
      collectedProgress: 24,
      operator: 'Buildlinks',
      operatorFame: 89.23,
      operatorNodes: 12,
      rate: 2,
      identifier: '0x4b72392347923439739',
    },
  ]


  data = data.sort((a: any, b: any) => {
    if (sortBy.key !== null) {
      if (sortBy.status === 'asce') {
        return a[sortBy.key] - b[sortBy.key]
      } else if (sortBy.status === 'desc') {
        return b[sortBy.key] - a[sortBy.key]
      }
    }
    return -1
  })

  const withSort = (title: string, key: string) => {
    return (
      <span style={{cursor: 'pointer'}} onClick={updateTableSort.bind(null, key)}>
        {title} <TableSortIcon status={sortBy.key === key ? sortBy.status : null}/>
      </span>
    )
  }


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'left' as 'left',
      width: 119,
    },
    {
      title: withSort('开始时间', 'startDate'),
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'left' as 'left',
      width: 128,
    },
    {
      title: '运行周期',
      dataIndex: 'period',
      key: 'period',
      align: 'left' as 'left',
      width: 98,
      render: (value: string) => <span className="bold">{value}</span>,
    },
    {
      title: '已募集 ETH',
      dataIndex: 'collected',
      key: 'collected',
      align: 'left' as 'left',
      width: 142,
      render: (value: string) => <span className="bold">{value}</span>,
    },
    {
      title: withSort('当前募集进度', 'collectedProgress'),
      dataIndex: 'collectedProgress',
      key: 'collectedProgress',
      align: 'left' as 'left',
      render: (value: number) => <Progress percent={value} />,
      width: 148,
    },
    {
      title: '运营商',
      dataIndex: 'operator',
      key: 'operator',
      align: 'left' as 'left',
      width: 115,
      render: (value: string, row: any) => (
        <Tooltip
          placement="top"
          align={{ offset: [0, -10] }}
          trigger="hover"
          overlay={renderOperatorTip(row)}
          destroyTooltipOnHide={true}
        >
          <a className="tooltip">{value}</a>
        </Tooltip>
      ),
    },
    {
      title: withSort('运营手续费', 'rate'),
      dataIndex: 'rate',
      key: 'rate',
      align: 'left' as 'left',
      width: 103,
      render: (value: number) => <span className="bold">{value}%</span>,
    },
    {
      title: '验证人公钥',
      dataIndex: 'identifier',
      key: 'identifier',
      align: 'left' as 'left',
      width: 229,
      render: (value: string) => (
        <React.Fragment>
          <span className="avatar-icon" />
          <span className="public-key">{value}</span>
        </React.Fragment>
      ),
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      align: 'left' as 'left',
      width: 200,
      render: (value: any, row: any) => (
        <React.Fragment>
          <Link className="table-btn" to={`/node/${row.id}`} style={{ marginRight: '10px' }}>详情</Link>
          <a href="#" className="table-btn" style={{ marginRight: '10px' }} onClick={participate.bind(null, row)}>
            我要参与
          </a>
        </React.Fragment>
      ),
    },
  ]

  // 参与挖矿
  const participate = (participant: any) => {
    setWalletDialogVisible(true)
  }

  // 选择钱包
  const selectWallet = (wallet: any) => {
    setWalletDialogVisible(false)
    setInvestDialogVisible(true)
  }

  const selectInvestment = (investmentFigure: number) => {
    console.log(`[selectInvestment]: ${investmentFigure} ETH`)
    setInvestDialogVisible(false)
  }

  return (
    <div className="container">
      <a className="participant-join-link" href="#">
        想成为运营商，为用户提供运营节点?
      </a>
      {data.length ? (
        <Table
          className="participant-list-table"
          columns={columns}
          data={data}
        />
      ) : (
        <div className="empty-participant-table">
          <div className="empty-participant-content">
            <div className="empty-participant-icon" />
            <span>暂时没有运营的节点</span>
          </div>
        </div>
        )}
      <WalletDialog visible={walletDialogVisible} onClose={setWalletDialogVisible.bind(null, false)} onSelect={selectWallet} />
      <InvestDialog visible={investDialogVisible} onClose={setInvestDialogVisible.bind(null, false)} onSelect={selectInvestment}/>
    </div>
  )
}

export default Participant
