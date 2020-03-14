import React, { useEffect, useState } from 'react'
import useApp from '../../service/useApp'
import Date from '../Date'
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
        <span className="panel-head-title">历史消息</span>
      </div>
      <ul className="news-list">
        {data.length
          ? data.map((item: any) => {
              return (
                <li key={item.id}>
                  <p>
                    <span className="news-list-dot" />
                    <span className="news-list-time">
                      <Date value={item.time} />
                    </span>
                  </p>
                  <p className="news-list-title">
                    {item.txid ? (
                      <a
                        href={`https://etherscan.io/tx/${item.txid}`}
                        target="_blank"
                      >
                        {item.msg}
                      </a>
                    ) : (
                      <a onClick={() => {}}>{item.msg}</a>
                    )}
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
