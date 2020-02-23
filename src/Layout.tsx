import React, { useEffect, useCallback } from 'react'
import Header from './components/Header'

import useApp from './service/useApp'
import WalletDialog from './components/Wallet'

const Layout: React.FC = ({ children }) => {
  const currentAccount = useApp(state => state.currentAccount)
  const provider = useApp(state => state.provider)

  return (
    <div className="layout">
      <Header />
      <>
        {currentAccount && provider && children}
        <WalletDialog visible={!currentAccount} closable={false} />
      </>
    </div>
  )
}

export default Layout
