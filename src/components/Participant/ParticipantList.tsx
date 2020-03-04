import Tooltip from 'rc-tooltip'
import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'rc-table'
import BN from 'bn.js'

import { NodeInfo } from '../../service/Pooldao'
import Progress from '../Progress'
import Date from '../Date'
import HandleParticipate from './HandleParticipate'
import './style.css'
import TableSortIcon, { SortIconType } from './TableSortIcon'
import Amount from '../Amount'

type ParticipantList = {
  data: NodeInfo[]
}

const ParticipantList: React.FC<ParticipantList> = ({ data }) => {
  const [sortBy, setSortBy] = React.useState<{
    key: string | null
    status: SortIconType
  }>({ key: null, status: null })

  const withSort = (title: string, key: string) => {
    return (
      <span
        style={{ cursor: 'pointer' }}
        onClick={updateTableSort.bind(null, key)}
      >
        {title}{' '}
        <TableSortIcon status={sortBy.key === key ? sortBy.status : null} />
      </span>
    )
  }

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
      const newStatus =
        sortBy.status === 'asce'
          ? 'desc'
          : sortBy.status === 'desc'
          ? null
          : 'asce'
      setSortBy({ key: dataKey, status: newStatus })
    } else {
      setSortBy({ key: dataKey, status: 'asce' })
    }
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
      title: withSort('开始时间', 'startTime'),
      dataIndex: 'startTime',
      key: 'startTime',
      align: 'left' as 'left',
      width: 128,
      render: (value: any) => <Date value={value} format="YYYY-MM-DD" />,
    },
    {
      title: '运行周期',
      dataIndex: 'duration',
      key: 'duration',
      align: 'left' as 'left',
      width: 98,
      render: (value: any) => `${value} 月`,
    },
    {
      title: '已募集 ETH',
      dataIndex: 'totalDeposit',
      key: 'totalDeposit',
      align: 'left' as 'left',
      width: 142,
      render: (value: string) => (
        <span className="bold">
          <Amount value={value} />
        </span>
      ),
    },
    {
      title: withSort('当前募集进度', 'collectedProgress'),
      dataIndex: 'progress',
      key: 'progress',
      align: 'left' as 'left',
      render: (value: number, row: any) => (
        <Progress current={row.totalDeposit} target={row.targetDeposit} />
      ),
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
      dataIndex: 'feePercentage',
      key: 'feePercentage',
      align: 'left' as 'left',
      width: 103,
      render: (value: number) => <span className="bold">{value}%</span>,
    },
    {
      title: '验证人公钥',
      dataIndex: 'pk',
      key: 'pk',
      align: 'left' as 'left',
      width: 229,
      render: (value: string) => (
        <span className="public-key ellipsis">{value}</span>
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
          <Link
            className="table-btn"
            to={`/node/${row.id}`}
            style={{ marginRight: '10px' }}
          >
            详情
          </Link>

          <HandleParticipate data={row} />
        </React.Fragment>
      ),
    },
  ]

  if (!data.length)
    return (
      <div className="empty-participant-table">
        <div className="empty-participant-content">
          <div className="empty-participant-icon" />
          <span>暂时没有运营的节点</span>
        </div>
      </div>
    )

  data = data.slice(0).sort((a: any, b: any) => {
    if (sortBy.key !== null) {
      if (sortBy.status === 'asce') {
        return a[sortBy.key] - b[sortBy.key]
      } else if (sortBy.status === 'desc') {
        return b[sortBy.key] - a[sortBy.key]
      }
    }
    return -1
  })

  return (
    <Table
      rowKey="id"
      className="participant-list-table"
      columns={columns}
      data={data}
    />
  )
}

export default ParticipantList