import Pooldao, { PooldaoOptions } from '@pooldao/js'
import { notification } from 'antd'
import axios, { AxiosInstance } from 'axios'
import { toPrecision } from '../utils/precision'

export interface Overview {
  deposit: number
  end: number
  participate: number
  pending: number
  pendingsettlement: number
  profit: number
  rate: number
  run: number
  time: number
  user: string
}

export interface NodeInfo {
  // 合约地址
  address: string
  // id
  id: string
  // 开始时间
  startTime: number
  // 周期
  duration: number
  // 用户充值数量
  userDepositTotal: string
  // 运营商充值数量
  operatorDeposit: string
  // 运营商地址
  operator: string
  // 目标数量
  depositCapacity: string
  //
  rate: number
  // 状态
  status: string
  // 运营手续费
  feePercentage: number
  daoFeePercentage: number
  partnerFeePercentage: number
  validatorSignature: string
  withdrawalCredentials: string
  depositData: string
  balance: string
  // 验证人公钥
  pk: string
  info: string
  statusText: string
  // 抵押列表
  depositList: {
    addr: string
    time: number
    value: string
  }[]
  owner: string
  reward: string
  ownerFee: string
  daoFee: string
  partnerFee: string
  minShardingDeposit: string
  partner: string
  dao: string
  withdrawList: {
    addr: string
    time: number
    value: string
  }[]
  statusTime: {
    status: string
    time: number
  }[]
}

export interface DepositNode {
  // id
  nodeId: string
  // 时间
  time: string
}

export interface OperatorsItem {
  id: string
  info: string
  address: string
  reputation: number
  nodeIDs: string[]
}

class PoolDaoMetaMask extends Pooldao {
  private request: AxiosInstance
  public isEnabled = false

  static checkMetaMask() {
    const anyWindow = window as any
    if (!anyWindow.ethereum || !anyWindow.ethereum.isMetaMask) return null
    return anyWindow.ethereum
  }

  constructor(options?: PooldaoOptions & { baseURL?: string }) {
    super(options)
    this.request = axios.create({
      baseURL: options?.baseURL || 'https://api.pooldao.org',
      // baseURL: options?.baseURL || 'http://127.0.0.1:7001',
    })
    this.request.interceptors.response.use(
      response => {
        if (response.data && response.data.result) {
          return response.data.result
        } else if (response.data.error) {
          return Promise.reject(response.data.error)
        } else {
          return Promise.reject('Unknown Error')
        }
      },
      error => Promise.reject(error)
    )
  }

  async notificationHelper(tx: any, sendOptions: any) {
    const key = `${Math.random()}`

    notification.info({
      key: key,
      message: `签名中...`,
      duration: null,
    })
    try {
      await tx.send(sendOptions)
      notification.success({
        key: key,
        message: `交易成功`,
      })
    } catch (error) {
      notification.close(key)
      notification.error({
        key: key,
        message: `交易失败`,
        description: `${error && error.message}`,
      })
    }
  }

  async init() {
    await Promise.all([super.init()])
  }

  async enable() {
    const ethereum = PoolDaoMetaMask.checkMetaMask()
    if (!ethereum) throw new Error('metamask not found')
    if (this.web3.setProvider(ethereum)) {
      const accounts = await ethereum.enable()
      this.isEnabled = true
      return accounts
    } else {
      throw new Error('setProvider failed')
    }
  }

  async getOverview(currentAccount: string): Promise<Overview | null> {
    try {
      return await this.request.get(`/overview/${currentAccount}`)
    } catch {
      return null
    }
  }

  async getConversion(currentAccount: string) {
    return Promise.all([
      this.getPoolEthBalance(currentAccount),
      this.getPoolEthTotalBalance(),
      this.getPoolEthRate(),
      this.getEthRate(),
    ]).then(([poolEthBalance, ethTotalBalance, poolEthRate, ethRate]) => {
      return {
        poolEthBalance,
        ethTotalBalance,
        poolEthRate,
        ethRate,
      }
    })
  }

  async getMyNodeList(currentAccount: string): Promise<NodeInfo[]> {
    return this.request.get(`/node/my/${currentAccount}`)
  }

  async getNodeDetail(nodeId: string): Promise<NodeInfo> {
    return this.request.get(`/node/${nodeId}`)
  }

  async getNodeList(): Promise<NodeInfo[]> {
    return this.request.get(`/node`)
  }

  async userDeposit(account: string, nodeAddr: string, value: number) {
    const nodeContract = this.getNodeContract(nodeAddr)
    return this.notificationHelper(this.user.deposit(nodeContract), {
      from: account,
      value: toPrecision(value),
      gas: 1000000,
      gasPrice: 10000000000,
    })
  }

  async userRefund(account: string, nodeAddr: string) {
    const nodeContract = this.getNodeContract(nodeAddr)
    return this.notificationHelper(this.user.refund(nodeContract), {
      from: account,
      gas: 1000000,
      gasPrice: 10000000000,
    })
  }

  async swap(account: string, amount: number) {
    return this.notificationHelper(
      this.user.swap(toPrecision(amount).toString()),
      {
        from: account,
        gas: 1000000,
        gasPrice: 10000000000,
      }
    )
  }

  async getUserDepositNodes(account: string): Promise<DepositNode[]> {
    return this.request.get(`/user${account}`)
  }

  async getOperators(): Promise<OperatorsItem[]> {
    return this.request.get(`/operators`)
  }

  async getOperatorDetail(operatorId: string): Promise<OperatorsItem[]> {
    return this.request.get(`/operators/${operatorId}`)
  }

  async getUserMsgs(account: string): Promise<any[]> {
    return this.request.get(`/msgs/${account}`)
  }

  async getMsgs(): Promise<any[]> {
    return this.request.get(`/msgs`)
  }
}

export default PoolDaoMetaMask
