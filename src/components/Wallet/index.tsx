import React, { useState, useEffect, useCallback } from 'react'
import Dialog from 'rc-dialog'
import IDialogPropTypes from 'rc-dialog/lib/IDialogPropTypes'
import 'rc-dialog/assets/index.css'

import './wallet.css'
import Spinner from '../../components/Spinner'
import metamask from '../../assets/wallets/metamask.svg'
import rightArrowBlue from '../../assets/right-arrow-blue.svg'
import Pooldao from '../../service/Pooldao'
import useApp, { useAppApi } from '../../service/useApp'
import message from '../Message'

interface WalletDialogProps extends IDialogPropTypes {
  onSelect?: (wallet: any) => void
  onClose?: () => void
}

const WalletLink: React.FC<{
  getLink?: string
  isLink: boolean
  onClick?: () => {}
}> = ({ getLink, isLink = false, onClick = () => {}, ...other }) => {
  if (isLink) {
    return (
      <a
        className="wallet-dialog__wallet"
        href={getLink}
        target="_blank"
        {...other}
      />
    )
  }
  return (
    <a className="wallet-dialog__wallet" onClick={() => onClick()} {...other} />
  )
}

const promiseInit = new Promise(() => {})

const WalletDialog: React.FC<WalletDialogProps> = ({
  className,
  onSelect = () => {},
  onClose = () => {},
  ...rest
}) => {
  const [loading, setLoading] = useState(false)
  const provider = useApp(state => state.provider)
  const [initPromise, setInitPromise] = useState(promiseInit)
  const ethereum = Pooldao.checkMetaMask()

  useEffect(() => {
    if (ethereum) {
      provider.web3.setProvider(ethereum)
      return setInitPromise(provider.init())
    }
  }, [provider, ethereum])

  const metamaskHandler = useCallback(async () => {
    setLoading(true)
    try {
      const [accounts] = await Promise.all([provider.enable(), initPromise])
      useAppApi.setState(state => {
        state.currentAccount = (accounts as string[])[0]
      })
      onClose()
    } catch {
      message.error('连接错误!请刷新后重试', 10)
    } finally {
      setLoading(false)
    }
  }, [onClose, message, setLoading, useAppApi, provider, initPromise])

  const walletList = [
    {
      name: 'MetaMask',
      img: metamask,
      handler: metamaskHandler,
      getLink: 'https://metamask.io/',
    },
  ]

  const classNames = `wallet-dialog${className ? ' ' + className : ''}`

  return (
    <Dialog className={classNames} onClose={onClose} mask={false} {...rest}>
      <h2>选择要连接的钱包</h2>
      <ul>
        {walletList.map((wallet, index) => (
          <li key={index} className="wallet-dialog__wallet-wrapper">
            <WalletLink
              isLink={!ethereum}
              getLink={wallet.getLink}
              onClick={wallet.handler}
            >
              <img src={wallet.img} className="wallet-dialog__wallet-logo" />
              <span className="wallet-dialog__wallet-name">{wallet.name}</span>
              {!loading ? (
                <img
                  src={rightArrowBlue}
                  alt="arrow"
                  className="wallet-dialog__wallet-arrow"
                />
              ) : (
                <Spinner />
              )}
            </WalletLink>
          </li>
        ))}
      </ul>
    </Dialog>
  )
}

export default WalletDialog
