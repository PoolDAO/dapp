import Pooldao, { PooldaoOptions } from '@pooldao/js'
import axios, { AxiosInstance } from 'axios'
import { toPrecision } from '../utils/precision'
import { notification } from 'antd'

export interface Overview {
  deposit: number
  end: number
  participate: number
  pending: number
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
  // 总充值数量
  totalDeposit: string
  // 目标数量
  targetDeposit: string
  // 状态
  status: string
  // 运营手续费
  feePercentage: number
  // 验证人公钥
  pk: string
}

export interface OperatorInfo {
  // id
  id: string
  // 合约地址
  address: string
  // 拥有者
  owner: string
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
      baseURL: options?.baseURL || 'http://127.0.0.1:7001',
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

  async getOverview(currentAccount: string) {
    return Promise.all([
      this.getEthBalance(currentAccount),
      this.getPoolEthBalance(currentAccount),
      this.request.get(`/overview/${currentAccount}`) as Promise<Overview>,
    ]).then(([ethBalance, poolEthBalance, data]) => {
      return {
        ethBalance,
        poolEthBalance,
        ...data,
      }
    })
  }

  async getMyNodeList(currentAccount: string) {
    return this.request.get(`/node/${currentAccount}`) as Promise<NodeInfo[]>
  }

  async getNodeDetail(nodeId: string) {
    return this.request.get(`/node/${nodeId}`) as Promise<NodeInfo[]>
  }

  async getNodeList() {
    return this.request.get(`/node`) as Promise<NodeInfo[]>
  }

  async userDeposit(account: string, nodeAddr: string, value: number) {
    const nodeContract = this.getNodeContract(nodeAddr)
    // console.log(nodeContract)
    return this.notificationHelper(this.user.deposit(nodeContract), {
      from: account,
      value: toPrecision(value),
      gas: 100000000,
    })
  }
}

export default PoolDaoMetaMask
