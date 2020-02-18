import React from 'react'
import './news.css'

const News: React.FC = () => {
  return (
    <div className="news-panel">
      <div className="panel-head">
        <span className="panel-head-title">近期关注消息</span>
      </div>
      <ul className="news-list">
        <li>
          <p>
            <span className="news-list-dot"/>
            <span className="news-list-time">16:23:43</span>
          </p>
          <p className="news-list-title">以太坊2.0可能在 Q1 上线，也可能在 Q2 上线</p>
        </li>
      </ul>
    </div>
  )
}

export default News
