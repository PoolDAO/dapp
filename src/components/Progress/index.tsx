import React from 'react'
import './progress.css'

interface ProgressProps {
  percent: number
  width?: number
  height?: number
}

const Progress: React.FC<ProgressProps> = props => {
  const { percent = 0, width = 64, height = 6 } = props

  return (
    <React.Fragment>
      <span
        className="progress-bar"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: `${height / 2}px`,
        }}
      >
        <span
          className="progress-percent-bar"
          style={{
            width: `${(width * percent) / 100}px`,
            height: `${height}px`,
            borderRadius: `${height / 2}px`,
            borderTopRightRadius: `${percent === 100 ? height / 2 : 0}px`,
            borderBottomRightRadius: `${percent === 100 ? height / 2 : 0}px`,
          }}
        />
      </span>
      <label className="progress-label">{percent}%</label>
    </React.Fragment>
  )
}

export default Progress