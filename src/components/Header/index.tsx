import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/logo@3x.png'
import useApp from '../../service/useApp'
import Copy from '../Copy'
import message from '../Message'
import WalletDialog from '../Wallet'
import './style.css'
import { Modal } from 'antd'

const Header: React.FC = () => {
  let location = useLocation()
  const [walletDialogVisible, setWalletDialogVisible] = useState(false)
  const [faqDialogVisible, setFaqDialogVisible] = useState(false)
  const currentAccount = useApp(state => state.currentAccount)

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
            <li className={activeClassName('/conversion')}>
              <a onClick={() => setFaqDialogVisible(true)}>
                <svg
                  className="nav-link-icon"
                  style={{
                    position: 'relative',
                    top: '3px',
                  }}
                  width="17px"
                  height="17px"
                  viewBox="0 0 20 20"
                >
                  <g stroke="none" stroke-width="1">
                    <g transform="translate(-622.000000, -35.000000)">
                      <g transform="translate(620.000000, 33.000000)">
                        <g transform="translate(2.000000, 2.000000)">
                          <path d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M10,2 C5.581722,2 2,5.581722 2,10 C2,14.418278 5.581722,18 10,18 C14.418278,18 18,14.418278 18,10 C18,5.581722 14.418278,2 10,2 Z M9.95657143,14.4794689 C10.4554113,14.4794689 10.9565714,14.8089501 10.9565714,15.4482419 L10.9565714,15.4482419 L10.9565714,15.8883698 C10.9565714,16.5276617 10.4577315,16.8571429 9.95657143,16.8571429 C9.45773152,16.8571429 8.95657143,16.5276617 8.95657143,15.8883698 L8.95657143,15.8883698 L8.95657143,15.4482419 C8.95657143,14.8089501 9.45773152,14.4794689 9.95657143,14.4794689 Z M10.0422857,4 C11.6742857,4 13,5.20727809 13,6.9628719 L13,6.9628719 L13,7.71281043 C13,8.81190066 12.456,9.46840423 12.0148571,9.87164986 C11.4365714,10.4027539 10.9268571,10.7297762 10.9268571,11.5903614 L10.9268571,11.5903614 L10.9268571,12.3403 C10.9268571,13.7492009 8.95428571,13.7492009 8.95428571,12.3403 L8.95428571,12.3403 L8.95428571,11.6075731 C8.95428571,9.85197935 9.71771429,9.43152201 10.7211429,8.40865503 C10.9588571,8.17014999 11.0274286,7.96852717 11.0274286,7.71281043 L11.0274286,7.71281043 L11.0274286,7.11040079 C11.0274286,6.54487337 10.6022857,6.10474551 10.0422857,6.10474551 L10.0422857,6.10474551 L9.95771429,6.10474551 C9.39771429,6.10474551 8.97257143,6.54241456 8.97257143,7.11040079 L8.97257143,7.11040079 L8.97257143,7.12761249 C8.97257143,8.5365134 7,8.5365134 7,7.12761249 L7,7.12761249 L7,6.9628719 C7,5.20727809 8.32571429,4 9.95771429,4 L9.95771429,4 Z"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <span>FAQ</span>
              </a>
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
              {currentAccount}
              <Copy
                onCopy={() => {
                  message.info('复制成功', 1)
                }}
                text={currentAccount || ''}
              >
                <span className="nav-address-copy-icon" />
              </Copy>
            </div>
          </div>
        </div>
      </nav>
      <WalletDialog
        visible={walletDialogVisible}
        onSelect={switchWallet}
        closable={true}
        onClose={setWalletDialogVisible.bind(null, false)}
      />
      <Modal visible={faqDialogVisible} width={560} footer={null} className="faq-wrapper" onCancel={() => setFaqDialogVisible(false)}>
        <div className="FAQ">
          <h1>FAQ</h1>
          <h2>关于 PoolDAO</h2>
          <p>
            PoolDAO 是全球首个以去中心化自治组织方式实现的以太坊 2.0
            去中心化矿池协议。致力于让用户可以参与以太坊 PoS
            挖矿获取中⻓期稳定收益。详情查看官网
            <a href="https://pooldao.org/" target="_blank">
              https://pooldao.org/
            </a>
            。
          </p>
          <h2>普通用户</h2>
          <p className="qn">Q1：为什么要参与运营商提供的节点？</p>
          <p className="an">
            A1：避免节点运营所需的计算资源 / 技术条件 /
            运营成本和高额资产抵押要求的实际投入，只需要参与专业运营商提供的节点，投入小额资产，既可自动分享节点挖矿收益。
          </p>
          <p className="qn">Q2：节点抵押资产是安全的吗？</p>
          <p className="an">
            A2：资产托管于节点智能合约，无第三方可以操作。在开启节点挖矿后，抵押资产会自动进入以太坊
            2.0 的充值合约中进行节点挖矿。
          </p>
          <p className="qn">Q3：选择节点需要注意什么？</p>
          <p className="an">
            A3：根据运行周期 / 运营商手续费 / 运营商信息 /
            募集进度等信息来挑选自己偏好的节点。
          </p>
          <p className="qn">Q4：参与节点挖矿的抵押金额是多少？</p>
          <p className="an">
            {`A4：１ether <= 参与金额 <= 16 ether，参与金额必须为整数 ether。`}
          </p>
          <p className="qn">Q5：普通用户如何参与节点挖矿？</p>
          <p className="an">
            A5：在＂我要挖矿＂页面找到想要参与的节点，点击＂我要参与＂按钮，选择参与金额大小，最后点击确定发送交易。
          </p>
          <p className="qn">Q6：参与节点挖矿之后，怎样退出节点，获得收益？</p>
          <p className="an">
            A7：节点在参与以太坊 PoS
            挖矿期间，为了获得较稳定的收益，一般需要固定周期运行（[１－６］个月）。所以，运营商一般会在预设的节点运行时间到期后才会退出运行，清算收益。在此之前，用户无法单独退出节点挖矿。节点运行到期后，运营商会清算节点收益，通过智能合约自动为参与的用户账户分发对应的收益代币
            poolETH。
          </p>
          <p className="qn">Q7：收益代币 poolETH 如何变现？</p>
          <p className="an">
            A7：可以在“兑换”页面，按当前兑换比例换成 ether 变成可变现资产。
          </p>
          <h2>运营商</h2>
          <p>
            想要成为运营商，请在
            <a href="https://github.com/PoolDAO/dapp/issues/12" target="_blank">
              https://github.com/PoolDAO/dapp/issues/12
            </a>
            中与我们联系。
          </p>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default Header
