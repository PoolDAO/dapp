import React from 'react'
import './nodeInfo.css'

const NodeInfo: React.FC = () => {
  return (
    <div className="node-info-panel">
      <ul className="node-info">
        <li>
          <p>8</p>
          <p>共参与节点数</p>
        </li>
        <li>
          <p>4</p>
          <p>运行中节点数</p>
        </li>
        <li>
          <p>2</p>
          <p>已清算节点数</p>
        </li>
        <li>
          <p>2</p>
          <p>待启动节点数</p>
        </li>
      </ul>
    </div>
  )
}
export default NodeInfo
