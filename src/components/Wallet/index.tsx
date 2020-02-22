import React, { useState } from 'react'
import Dialog from 'rc-dialog'
import IDialogPropTypes from 'rc-dialog/lib/IDialogPropTypes'
import 'rc-dialog/assets/index.css'
import './wallet.css'
import Spinner from '../../components/Spinner'
import metamask from '../../assets/wallets/metamask.svg'
import rightArrowBlue from '../../assets/right-arrow-blue.svg'
import Pooldao from '../../service/Pooldao'
import { useAppApi } from '../../service/useApp'

interface WalletDialogProps extends IDialogPropTypes {
  onSelect: (wallet: any) => void
}

const WalletDialog: React.FC<WalletDialogProps> = ({
  className,
  onSelect,
  onClose,
  ...rest
}) => {
  const [loading, setLoading] = useState(false)

  const walletList = [
    {
      name: 'MetaMask',
      img: metamask,
      handler: async () => {
        const pooldao = new Pooldao()
        setLoading(true)
        console.log(pooldao)
        try {
          await pooldao.init()
          useAppApi.setState(state => (state.provider = pooldao))
        } catch {
          alert('连接错误')
        } finally {
          setLoading(false)
        }
      },
    },
  ]

  const classNames = `wallet-dialog${className ? ' ' + className : ''}`

  return (
    <Dialog className={classNames} {...rest}>
      <h2>选择要连接的钱包</h2>
      <ul>
        {walletList.map((wallet, index) => (
          <li
            key={index}
            onClick={() => wallet.handler()}
            className="wallet-dialog__wallet"
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
          </li>
        ))}
      </ul>
    </Dialog>
  )
}

export default WalletDialog
