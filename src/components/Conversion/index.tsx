import React from 'react'
import InputNumber from 'rc-input-number'
import WalletDialog from '../Wallet'
import './style.css'

const Conversion: React.FC = () => {
  const [wallet, setWallet] = React.useState()
  const [fromValue, setFromValue] = React.useState('1')
  const [toValue, setToValue] = React.useState('0.5')


  const switchWallet = (wallet: any) => {
    setWallet(wallet.name)
  }

  return !wallet ? (
    <WalletDialog
      className="conversion-wallet"
      visible={true}
      onSelect={switchWallet}
      mask={false}
    />
  ) : (
    <div className="container">
      <div className="conversion-panel">
        <div className="conversion-dialog">
          <h2>兑换</h2>
          <div className="conversion-form">
            <div className="conversion-from">
              <h3>从</h3>
              <div className="conversion-from-block">poolETH</div>
              <h3>数量</h3>
              <div className="conversion-from-block">
                <InputNumber type="text" value={fromValue} onChange={(e: any) => {setFromValue(e.target.value)}} />
                <span className="conversion-unit">poolETH</span>
              </div>
            </div>
            <div className="conversion-to">
              <h3>到</h3>
              <div className="conversion-from-block">ETH</div>
              <h3>数量</h3>
              <div className="conversion-from-block">
                <InputNumber type="text" value={toValue} onChange={(e: any) => {setToValue(e.target.value)}}/>
                <span className="conversion-unit">ETH</span>
              </div>
            </div>
          </div>
          <p className="conversion-balance">余额: 32.63745637 poolETH</p>
          <p className="conversion-info">当前奖池: 432ETH</p>
          <p className="conversion-info">当前汇率: 1poolETH = 0.5ETH</p>
          <button className="button">确定兑换</button>
        </div>
      </div>
    </div>
  )
}

export default Conversion
