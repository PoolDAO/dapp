import { Button } from 'antd'
import Table from 'rc-table'
import React from 'react'
import { Link } from 'react-router-dom'

import { AppState } from '../../service/useApp'
import Amount from '../Amount'
import Date from '../Date'
import './nodeList.css'

const renderEmpty = () => {
  return (
    <div className="table-empty-element">
      <span className="table-empty-icon" />
      内容为空
    </div>
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
      dataIndex: 'myDeposit',
      key: 'myDeposit',
      align: 'left' as 'left',
      width: 176,
      render: (value: string) => <Amount value={value} className="bold" postfix="ETH" />,
    },
    {
      title: '我的收益',
      dataIndex: 'estimatedProfit',
      key: 'estimatedProfit',
      align: 'left' as 'left',
      width: 158,
      render: (value: string) => <Amount className="green bold" value={value} postfix="ETH" />,
    },
    {
      title: '年化收益',
      dataIndex: 'rate',
      key: 'rate',
      align: 'left' as 'left',
      width: 133,
      render: (value: any) => <span>{value || 0}%</span>,
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      align: 'left' as 'left',
      width: 75,
      render: (value: any, row: any) => (
        <React.Fragment>
          <Button className="table-btn" style={{ marginRight: '10px' }}>
            <Link to={`/node/${row.id}`}>详情</Link>
          </Button>
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

export default CompletedList
