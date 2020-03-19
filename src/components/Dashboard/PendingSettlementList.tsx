import { Button } from 'antd'
import Table from 'rc-table'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppState, useAppApi } from '../../service/useApp'
import Amount from '../Amount'
import Date from '../Date'
import './nodeList.css'
import OperatorLink from '../OperatorLink'

const renderEmpty = () => {
  return (
    <div className="table-empty-element">
      <span className="table-empty-icon" />
      内容为空
    </div>
  )
}

const PendingSettlementList: React.FC<{
  data: AppState['nodes'][]
}> = ({ data }) => {
  useEffect(() => {
    useAppApi.setState(state => {
      state.forceUpdateOverview = state.forceUpdateOverview + 1
      state.forceUpdateNodeList = state.forceUpdateNodeList + 1
    })
  }, [])

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

      render: (value: string) => (
        <Amount value={value} className="bold" postfix="ETH" />
      ),
    },
    {
      title: '我的收益',
      dataIndex: 'currentProfit',
      key: 'currentProfit',
      align: 'left' as 'left',

      render: (value: string) => (
        <Amount className="green bold" value={value} postfix="ETH" />
      ),
    },
    {
      title: '运营商',
      dataIndex: 'operator',
      key: 'operator',
      align: 'left' as 'left',

      render: (value: string) => <OperatorLink operator={value} />,
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

export default PendingSettlementList
