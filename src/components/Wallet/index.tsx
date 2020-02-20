import React from 'react'
import Dialog from 'rc-dialog'
import IDialogPropTypes from 'rc-dialog/lib/IDialogPropTypes'
import 'rc-dialog/assets/index.css'
import './style.css'

interface WalletDialogProps extends IDialogPropTypes {
  onSelect: (wallet: any) => void
}

const WalletDialog: React.FC<WalletDialogProps> = ({
  className,
  onSelect,
  onClose,
  ...rest
}) => {
  const walletList = [
    {
      name: 'MetaMask',
    },
    {
      name: 'Ledger Nano',
    },
    {
      name: 'Trezor',
    },
    {
      name: 'Wallet Connect',
    },
    {
      name: 'WalletLink',
    },
  ]

  const classNames = `wallet-dialog${className ? ' ' + className : ''}`
  console.log(classNames)

  return (
    <Dialog
      className={classNames}
      closable={onClose ? true : false}
      {...rest}
    >
      <h2>选择要连接的钱包</h2>
      <ul>
        {walletList.map((wallet, index) => (
          <li key={index} onClick={onSelect.bind(null, wallet)}>
            <span className="wallet-logo" />
            {wallet.name}
          </li>
        ))}
      </ul>
    </Dialog>
  )
}

export default WalletDialog
