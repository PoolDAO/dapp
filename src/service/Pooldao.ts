import Pooldao, { PooldaoOptions } from '@pooldao/js'
import axios, { AxiosInstance } from 'axios'

interface Overview {
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
}

export default PoolDaoMetaMask
