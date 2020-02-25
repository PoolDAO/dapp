import React from 'react'
import './nodeInfo.css'

const NodeInfo: React.FC<{
  data: {
    participate: number
    run: number
    end: number
    pending: number
  }
}> = ({ data }) => {
  return (
    <div className="node-info-panel">
      <ul className="node-info">
        <li>
          <p>{data.participate}</p>
          <p>共参与节点数</p>
        </li>
        <li>
          <p>{data.run}</p>
          <p>运行中节点数</p>
        </li>
        <li>
          <p>{data.end}</p>
          <p>已清算节点数</p>
        </li>
        <li>
          <p>{data.pending}</p>
          <p>待启动节点数</p>
        </li>
      </ul>
    </div>
  )
}
export default NodeInfo
