import React, { useEffect, useState } from 'react'
import Table from 'rc-table'
import { useHistory, useParams } from 'react-router-dom'

import useApp from '../../service/useApp'
import { NodeInfo } from '../../service/Pooldao'
import './style.css'
import Amount from '../Amount'
import Date from '../Date'
import Spinner from '../Spinner'

const OperatorDetail: React.FC = () => {
  const provider = useApp(state => state.provider)
  const nodeList = useApp(state => state.allNodeList)

  const params: any = useParams()
  const [data, setData] = useState()

  const history = useHistory()

  useEffect(() => {
    provider.getOperatorDetail(params.operatorId).then(result => {
      setData(result)
    })
  }, [provider])

  if (!data)
    return (
      <div className="spinner-center">
        <Spinner />
      </div>
    )

  // const fiancialData = [
  //   {
  //     name: '运营商充值金额',
  //     value: <Amount value={data.operatorDeposit} postfix="ETH" />,
  //   },
  //   {
  //     name: '用户充值金额',
  //     value: <Amount value={data.userDepositTotal} postfix="ETH" />,
  //   },
  //   {
  //     name: '最小充值金额',
  //     value: <Amount value={data.minShardingDeposit} postfix="ETH" />,
  //   },
  //   {
  //     name: '最大充值金额',
  //     value: <Amount value={data.depositCapacity} postfix="ETH" />,
  //   },
  //   {
  //     name: '节点盈利金额',
  //     value: <Amount value={data.reward} postfix="ETH" />,
  //   },
  //   { name: '节点周期', value: `${data.duration} 月` },
  //   {
  //     name: '运营商运营手续费',
  //     value: <Amount value={data.feePercentage} postfix="ETH" />,
  //   },
  //   {
  //     name: '运营手续费率',
  //     value: <Amount value={data.ownerFee} postfix="ETH" />,
  //   },
  //   {
  //     name: '协议手续费金额',
  //     value: <Amount value={data.daoFee} postfix="ETH" />,
  //   },
  //   {
  //     name: '协议手续费率',
  //     value: <Amount value={data.daoFeePercentage} postfix="ETH" />,
  //   },
  //   {
  //     name: '生态合作方手续费金额',
  //     value: <Amount value={data.partnerFee} postfix="ETH" />,
  //   },
  //   { name: '', value: '' },
  // ]

  // const operatorInfo = [
  //   { name: '运营商地址', value: <span>{data.owner}</span>, color: '#0080FF' },
  //   {
  //     name: '运营商合作地址',
  //     value: <span>{data.owner}</span>,
  //   },
  //   { name: '生态合作方', value: <span>{data.partner}</span> },
  //   { name: '协议方', value: <span>{data.dao}</span> },
  //   {
  //     name: 'validator pub key',
  //     value: <span>{data.pk}</span>,
  //   },
  //   {
  //     name: 'validator signature',
  //     value: <span>{data.validatorSignature}</span>,
  //   },
  //   {
  //     name: 'withdrawal credentials',
  //     value: <span>{data.withdrawalCredentials}</span>,
  //   },
  //   { name: 'deposit data', value: <span>{data.depositData}</span> },
  // ]

  // const depositListColumns = [
  //   {
  //     title: '公钥',
  //     dataIndex: 'addr',
  //     key: 'addr',
  //     align: 'left' as 'left',
  //     width: 200,
  //     render: (value: any) => {
  //       return (
  //         <span className="ellipsis" style={{ width: 150 }}>
  //           {value}
  //         </span>
  //       )
  //     },
  //   },
  //   {
  //     title: '金额(ETH)',
  //     dataIndex: 'value',
  //     key: 'value',
  //     align: 'left' as 'left',
  //     width: 156,
  //     render: (value: any) => {
  //       return <Amount value={value} />
  //     },
  //   },
  //   {
  //     title: '时间',
  //     dataIndex: 'time',
  //     key: 'time',
  //     align: 'right' as 'right',
  //     width: 184,
  //     render: (value: any) => {
  //       return <Date value={value} />
  //     },
  //   },
  // ]

  // const chargeListColumns = depositListColumns

  const column = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'left' as 'left',
      width: 400,
      render: (value: string) => <span className="bold">{value}</span>,
    },
    {
      title: '状态',
      dataIndex: 'id',
      key: 'status',
      align: 'right' as 'right',
      width: 184,
      render: (value: any) => {
        return (nodeList.find(node => node.id === value) || {}).status
      },
    },
  ]

  const listData = data.nodeIDs.map((id: string) => ({ id: id }))

  return (
    <div className="container">
      <div className="node-detail-panel">
        <div
          className="back-icon"
          onClick={() => {
            history.goBack()
          }}
        />
        <h2 className="operator__title">运营商详情</h2>
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
                  <Amount value={data.depositTotal} />
                </div>
              </div>
              <div className="operator__detail__row">
                <div className="operator__detail__label">累计运营盈利金额</div>
                <div className="operator__detail__content">
                  <span className="green-amount">+</span> <Amount className="green-amount" value={data.withdrawTotal} />
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
