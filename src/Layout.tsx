import React from 'react'
import Header from './components/Header'

import useApp from './service/useApp'
import WalletDialog from './components/Wallet'

const Layout: React.FC = ({ children }) => {
  const provider = useApp(state => state.provider)

  return (
    <div className="layout">
      <Header />
      {provider ? (
        children
      ) : (
        <WalletDialog
          className="layou__wallet"
          visible={true}
          closable={false}
        />
      )}
    </div>
  )
}

export default Layout
