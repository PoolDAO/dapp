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
}

export default PoolDaoMetaMask
