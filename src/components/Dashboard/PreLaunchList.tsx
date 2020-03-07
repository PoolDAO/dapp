import { Modal, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import Table from 'rc-table'
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'

import { useApp, AppState } from '../../service/useApp'
import Amount from '../Amount'
import Date from '../Date'
import OperatorLink from '../OperatorLink'
import Progress from '../Progress'
import './nodeList.css'

const { confirm } = Modal

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
  const provider = useApp(state => state.provider)
  const currentAccount = useApp(state => state.currentAccount)

  const showConfirm = useCallback(row => {
    confirm({
      title: `确认从节点 ${row.id} 退款`,
      icon: <ExclamationCircleOutlined />,
      okText: '退款',
      cancelText: '取消',
      onOk() {
        return provider.userRefund(currentAccount, row.address).finally(() => {

        })
      },
    })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'left' as 'left',
      width: 50,
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
        <Progress current={row.totalDeposit} target={row.depositCapacity} />
      ),
    },
    {
      title: '我的充值',
      dataIndex: 'myDeposit',
      key: 'myDeposit',
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
      render: (value: string) => <OperatorLink operator={value} />,
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      align: 'left' as 'left',
      width: 180,
      render: (value: any, row: any) => (
        <React.Fragment>
          <Button className="table-btn" style={{ marginRight: '10px' }}>
            <Link to={`/node/${row.id}`}>详情</Link>
          </Button>
          {currentAccount !== row.owner ? (
            <Button
              className="table-btn table-btn-danger"
              onClick={() => showConfirm(row)}
            >
              退款
            </Button>
          ) : null}
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

export default PreLaunchList
