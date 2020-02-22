import Pooldao from '@pooldao/js'

class PoolDaoMetaMask extends Pooldao {
  static checkMetaMask() {
    const anyWindow = window as any
    if (!anyWindow.ethereum || !anyWindow.ethereum.isMetaMask) return null
    return anyWindow.ethereum
  }

  async init() {
    await Promise.all([super.init()])
  }

  async enable() {
    const ethereum = PoolDaoMetaMask.checkMetaMask()
    if (!ethereum) throw new Error('metamask not found')
    return ethereum.enable()
  }
}

export default PoolDaoMetaMask
