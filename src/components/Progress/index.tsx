import React from 'react'
import { fromPrecision } from '../../utils'

import './progress.css'

interface ProgressProps {
  current: string | number
  target: string | number
  width?: number
  height?: number
}

const Progress: React.FC<ProgressProps> = props => {
  const { current, target, width = 64, height = 6 } = props
  const percent = Number(fromPrecision(current, 18))
    ? Number(fromPrecision(current, 18)) / Number(fromPrecision(target, 18))
    : 0

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
      <label className="progress-label">{percent.toFixed(0)}%</label>
    </React.Fragment>
  )
}

export default Progress
