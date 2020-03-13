import React, { useEffect, useState } from 'react'
import Table from 'rc-table'
import { useHistory, useParams, Link } from 'react-router-dom'

import useApp from '../../service/useApp'
import { NodeInfo } from '../../service/Pooldao'
import './style.css'
import Amount from '../Amount'
import Date from '../Date'
import Spinner from '../Spinner'

const OperatorDetail: React.FC = () => {
  const provider = useApp(state => state.provider)
  const nodeList = useApp(state => state.allNodeList)
  const updateNodeInfoList = useApp(state => state.updateNodeInfoList)

  const params: any = useParams()
  const [data, setData] = useState()

  const history = useHistory()

  useEffect(() => {
    provider.getOperatorDetail(params.operatorId).then(result => {
      setData(result)
    })
    updateNodeInfoList()
  }, [provider])

  if (!data)
    return (
      <div className="spinner-center">
        <Spinner />
      </div>
    )

  const column = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'left' as 'left',
      width: 400,
      render: (value: string) => <Link to={`/node/${value}`}><span className="bold">{value}</span></Link>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'right' as 'right',
      width: 184,
    },
  ]

  const listData = data.nodeIDs
    .map((id: string) => {
      const node = nodeList.find(node => node.id === id)
      if (!node) return null
      return { id: id, status: node.status }
    })
    .filter((x: any) => x)

  return (
    <div className="container">
      <div className="node-detail-panel">
        <div
          className="back-icon"
          onClick={() => {
            history.goBack()
          }}
        />
        <div className="operator__header">
          <h2 className="operator__title">运营商详情</h2>
          <div className="operator__badge">
            编号：{data.id}
          </div>
        </div>
        <section className="operator__container">
          <div className="operator__list">
            <div className="operator__list__title">节点列表</div>
            <Table
              className="operator__list__table"
              columns={column}
              rowKey={'id'}
              data={listData}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div className="operator__detail">
              <div className="operator__detail__row">
                <div className="operator__detail__label">运营商公钥</div>
                <div className="operator__detail__content">{data.owner}</div>
              </div>
              <div className="operator__detail__row">
                <div className="operator__detail__label">运营商合约</div>
                <div className="operator__detail__content">
                  {data.operatorManager}
                </div>
              </div>
              <div className="operator__detail__row">
                <div className="operator__detail__label">累计运营节点数</div>
                <div className="operator__detail__content">
                  {data.totalNode}
                </div>
              </div>
              <div className="operator__detail__row">
                <div className="operator__detail__label">累计充值金额</div>
                <div className="operator__detail__content">
                  <Amount value={data.depositTotal} /> ETH
                </div>
              </div>
              <div className="operator__detail__row">
                <div className="operator__detail__label">累计运营盈利金额</div>
                <div className="operator__detail__content">
                  <span className="green-amount">
                    +{' '}
                    <Amount
                      className="green-amount"
                      value={data.withdrawTotal}
                    />{' '}
                    ETH
                  </span>
                </div>
              </div>
              <div className="operator__detail__row">
                <div className="operator__detail__label">声誉值</div>
                <div className="operator__detail__content">
                  {data.reputation}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default OperatorDetail
