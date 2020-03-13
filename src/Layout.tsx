import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import WalletDialog from './components/Wallet'
import useApp from './service/useApp'

const Layout: React.FC = ({ children }) => {
  const currentAccount = useApp(state => state.currentAccount)
  const provider = useApp(state => state.provider)

  return (
    <div className="layout">
      <Header />
      <div style={{ minHeight: 'calc(100vh - 190px)' }}>
        {currentAccount && provider && children}
        <WalletDialog visible={!currentAccount} closable={false} />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
