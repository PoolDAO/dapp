import React from 'react'
import InputNumber from 'rc-input-number'

import Amount from '../Amount'
import './style.css'

import useApp, { useAppApi } from '../../service/useApp'

const Conversion: React.FC = () => {
  const [fromValue, setFromValue] = React.useState('')
  const [toValue, setToValue] = React.useState('')
  const poolEthBalance = useApp(state => state.poolEthBalance)

  return (
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
                <InputNumber
                  type="text"
                  value={fromValue}
                  onChange={(value: any) => {
                    setFromValue(value)
                  }}
                />
                <span className="conversion-unit">poolETH</span>
              </div>
            </div>
            <div className="conversion-to">
              <h3>到</h3>
              <div className="conversion-from-block">ETH</div>
              <h3>数量</h3>
              <div className="conversion-from-block">
                <InputNumber
                  type="text"
                  value={toValue}
                  onChange={(value: any) => {
                    setToValue(value)
                  }}
                />
                <span className="conversion-unit">ETH</span>
              </div>
            </div>
          </div>
          <p className="conversion-balance">
            余额: <Amount value={poolEthBalance} /> poolETH
          </p>
          <p className="conversion-info">当前奖池: 432ETH</p>
          <p className="conversion-info">当前汇率: 1poolETH = 0.5ETH</p>
          <button className="button">确定兑换</button>
        </div>
      </div>
    </div>
  )
}

export default Conversion
