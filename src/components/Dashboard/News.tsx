import React, { useEffect, useState } from 'react'
import useApp, { useAppApi } from '../../service/useApp'

import './news.css'

const News: React.FC = () => {
  const provider = useApp(state => state.provider)
  const currentAccount = useApp(state => state.currentAccount)
  const [data, setData] = useState<any>([])

  useEffect(() => {
    provider.getUserMsgs(currentAccount).then((result: any[]) => {
      setData(result)
    })
  }, [currentAccount, provider])

  return (
    <div className="news-panel">
      <div className="panel-head">
        <span className="panel-head-title">近期关注消息</span>
      </div>
      <ul className="news-list">
        {data.length
          ? data.map((item: any) => {
              return (
                <li key={item.id}>
                  <p>
                    <span className="news-list-dot" />
                    <span className="news-list-time">16:23:43</span>
                  </p>
                  <p className="news-list-title">
                    <a onClick={() => {}}>{item.msg}</a>
                  </p>
                </li>
              )
            })
          : '无'}
      </ul>
    </div>
  )
}

export default News
