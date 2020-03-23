import React, { useCallback, useEffect, useState } from 'react'
import InputNumber from 'rc-input-number'
import { Button } from 'antd'

import Amount from '../Amount'
import './style.css'

import useApp, { useAppApi } from '../../service/useApp'

const Conversion: React.FC = () => {
  const [fromValue, setFromValue] = React.useState()
  const [toValue, setToValue] = React.useState()
  const poolEthBalance = useApp(state => state.poolEthBalance)
  const provider = useApp(state => state.provider)
  const currentAccount = useApp(state => state.currentAccount)
  const ethTotalBalance = useApp(state => state.ethTotalBalance)
  const ethRate = useApp(state => state.ethRate)
  const poolEthRate = useApp(state => state.poolEthRate)

  const rate = Number(poolEthRate) / Number(ethRate)

  const [loading, setLoading] = useState(false)

  const getData = useCallback(async () => {
    const result = await provider.getConversion(currentAccount)

    useAppApi.setState(state => {
      state.poolEthBalance = result.poolEthBalance
      state.ethTotalBalance = result.ethTotalBalance
      state.ethRate = result.ethRate
      state.poolEthRate = result.poolEthRate
    })
  }, [provider, currentAccount])

  useEffect(() => {
    getData()
  }, [getData])

  const swap = useCallback(() => {
    if (fromValue) {
      setLoading(true)
      provider.swap(currentAccount, fromValue).finally(() => {
        setLoading(false)
        setFromValue(undefined)
        setToValue(undefined)
        getData()
      })
    }
  }, [fromValue, provider, currentAccount, getData])

  console.log(fromValue)
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
              <div
                className="conversion-from-block"
                style={{ background: '#f5f6f8' }}
              >
                <InputNumber
                  type="text"
                  value={fromValue}
                  onChange={(value: any) => {
                    if (!isNaN(value)) {
                      setFromValue(value)
                      setToValue(Number((value * rate).toFixed(6)))
                    }
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
                <InputNumber disabled type="text" value={toValue} />
                <span className="conversion-unit">ETH</span>
              </div>
            </div>
          </div>
          <p className="conversion-balance">
            poolETH 余额: <Amount value={poolEthBalance} />
          </p>

          <p className="conversion-info">
            当前奖池: <Amount value={ethTotalBalance} postfix="ETH" />
          </p>
          <p className="conversion-info">
            当前汇率: 1 poolETH = {rate.toFixed(2)} ETH
          </p>
          <Button className="button" onClick={() => swap()} loading={loading}>
            确定兑换
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Conversion
