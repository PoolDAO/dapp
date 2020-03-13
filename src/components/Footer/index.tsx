import React from 'react'

import './styles.css'
import wechat from '../../assets/wechat.png'
const Footer: React.FC = () => {
  return (
    <div className="footer cont">
      <div className="footer-container">
        <p>All rights reserved © 2020 PoolDAO</p>
        <div className="contact-area">
          <div className="wechat">
            <img src={wechat} alt="wechat" className="qrcode" />
          </div>
          <a
            href="https://github.com/PoolDAO"
            target="_blank"
            title="pooldao"
            rel="noopener noreferrer"
          >
            {' '}
          </a>
        </div>
        <div className="logo no-repeat-contain"></div>
      </div>
    </div>
  )
}

export default Footer
