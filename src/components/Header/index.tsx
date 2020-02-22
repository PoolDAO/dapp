import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import WalletDialog from '../Wallet'
import Logo from '../../assets/logo@3x.png'
import './style.css'

const Header: React.FC = () => {
  let location = useLocation()
  const [walletDialogVisible, setWalletDialogVisible] = React.useState(false)

  const pathnameMatcher = (pathname: string) => {
    const matchArray = location.pathname.match(new RegExp(pathname))
    if (Array.isArray(matchArray) && matchArray.length > 0) {
      return true
    }
    return false
  }

  const activeClassName = (pathname: string) =>
    pathnameMatcher(pathname) ? 'nav-link-active' : ''

  const switchWallet = (wallet: any) => {
    console.log(`[switchWallet]: switch wallet to ${wallet.name}`)
    setWalletDialogVisible(false)
  }

  return (
    <React.Fragment>
      <nav className="nav">
        <div className="container">
          <div className="nav-logo">
            <a href="/dashboard">
              <img src={Logo} alt="logo" />
            </a>
          </div>
          <ul className="nav-links">
            <li className={activeClassName('/dashboard')}>
              <Link to="/dashboard">
                <svg
                  className="nav-link-icon"
                  width="16px"
                  height="24px"
                  viewBox="0 0 16 24"
                  style={{ transform: 'translateY(5px)' }}
                >
                  <g stroke="none" strokeWidth="1" fillRule="evenodd">
                    <path
                      d="M16,14 L8,24 L0,14 L8,17 L16,14 Z M8,0 L16,12 L8,15 L1.8189894e-12,12 L8,0 Z"
                      fillRule="nonzero"
                    ></path>
                  </g>
                </svg>
                <span>我的</span>
              </Link>
            </li>
            <li className={activeClassName('/participant')}>
              <Link to="/participant">
                <svg
                  className="nav-link-icon"
                  width="16px"
                  height="14px"
                  viewBox="0 0 16 14"
                >
                  <g stroke="none" strokeWidth="1" fillRule="evenodd">
                    <path
                      d="M16,8 L16,14 L0,14 L0,8 L16,8 Z M14,10 L6,10 L6,12 L14,12 L14,10 Z M4,10 L2,10 L2,12 L4,12 L4,10 Z M16,0 L16,6 L0,6 L0,0 L16,0 Z M14,2 L6,2 L6,4 L14,4 L14,2 Z M4,2 L2,2 L2,4 L4,4 L4,2 Z"
                      fillRule="nonzero"
                    ></path>
                  </g>
                </svg>
                <span>参与挖矿</span>
              </Link>
            </li>
            <li className={activeClassName('/conversion')}>
              <Link to="/conversion">
                <svg
                  className="nav-link-icon"
                  width="19px"
                  height="9px"
                  viewBox="0 0 19 9"
                >
                  <g stroke="none" strokeWidth="1" fillRule="evenodd">
                    <path
                      d="M11.2015896,1.20996145 C12.2889272,0.132545122 13.9384766,-0.273337006 15.4921069,0.188501664 C17.0311659,0.638895019 18.2052074,1.97998621 18.4450252,3.55630773 C18.862549,6.17129319 16.8348152,8.49256506 14.1988357,8.49256506 C13.1310039,8.49256506 12.1262358,8.11352291 11.3444991,7.42737756 L11.1681302,7.26361753 L10.8521514,6.98779182 C10.4014837,6.59085347 10.4014837,5.89427664 10.8515419,5.49787694 C11.1996691,5.18923676 11.7077225,5.16351675 12.0809032,5.41931327 L12.1791143,5.49605465 L12.5514722,5.81962688 C13.0088273,6.27280893 13.5885132,6.51301115 14.2063391,6.51301115 C15.6798334,6.51301115 16.7766488,5.16379526 16.4316458,3.69776279 C16.236429,2.87065909 15.5392922,2.20099031 14.698786,2.03442152 C13.9646041,1.89141206 13.2502877,2.07320864 12.7037662,2.53849 L12.5707172,2.66069236 L11.048,4 L9.25263865,5.60422373 L9.243,5.595 L7.30658991,7.29003855 C6.63901713,7.95152014 5.7460896,8.36798456 4.78647209,8.47347477 L4.54527015,8.49333052 L4.30184039,8.5 C1.93073357,8.5 0,6.59177604 0,4.25 C0,1.90822396 1.93073357,0 4.30184039,0 C5.36776107,0 6.37792792,0.382352405 7.15489875,1.07008034 L7.32997937,1.23417262 L7.64852468,1.50477324 C8.09919238,1.90171158 8.09919238,2.59828842 7.64913423,2.99468812 C7.30100701,3.30332829 6.79295356,3.32904831 6.41999223,3.07344165 L6.32184654,2.9967569 L5.9567073,2.68037312 C5.49729397,2.22515164 4.9242716,1.98698885 4.30184039,1.98698885 C2.8283461,1.98698885 1.73153074,3.33620474 2.07653372,4.80223721 C2.2717505,5.62934091 2.96888725,6.29900969 3.80939353,6.46557848 C4.54357539,6.60858794 5.25789184,6.42679136 5.80441331,5.96151 L5.93746234,5.83930764 L7.458,4.5 L7.4473695,4.5 L9.0890563,3.06593046 L11.2015896,1.20996145 Z"
                      fillRule="nonzero"
                    ></path>
                  </g>
                </svg>
                <span>兑换</span>
              </Link>
            </li>
          </ul>
          <div className="nav-user-info">
            <div
              className="nav-avatar"
              onClick={setWalletDialogVisible.bind(null, true)}
            >
              <span>切换</span>
            </div>
            <div className="nav-address">
              0x4b9d7504014bC1810572979739EA00317c80308a
              <a
                className="nav-address-copy-icon"
                onClick={() => {
                  alert('Address copied')
                }}
              />
            </div>
          </div>
        </div>
      </nav>
      <WalletDialog
        visible={walletDialogVisible}
        onSelect={switchWallet}
        onClose={setWalletDialogVisible.bind(null, false)}
      />
    </React.Fragment>
  )
}

export default Header
