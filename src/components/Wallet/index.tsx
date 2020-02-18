import React from 'react'
import Dialog from 'rc-dialog'
import 'rc-dialog/assets/index.css'
import './style.css'

interface WalletDialogProps {
  visible: boolean
  onSelect: (wallet: any) => void
  onClose: () => void
}

const WalletDialog: React.FC<WalletDialogProps> = ({
  visible,
  onSelect,
  onClose,
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

  return (
    <Dialog
      mask
      className="wallet-dialog"
      visible={visible}
      onClose={onClose.bind(null, false)}
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
