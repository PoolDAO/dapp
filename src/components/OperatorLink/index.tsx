import React from 'react'
import Tooltip from 'rc-tooltip'
import { Link } from 'react-router-dom'

import { useAppSelector, getOperatorsItem } from '../../service/useApp'

type RenderOperatorsItemProps = {
  operator: string
  tooltip?: boolean
}

const RenderOperatorsItem: React.FC<RenderOperatorsItemProps> = ({
  operator,
  tooltip = true,
}) => {
  const data = useAppSelector(getOperatorsItem(operator), [operator])

  if (!data) return null

  const inner = (
    <Link to={`/operator/${data.id}`} className="tooltip ellipsis" style={{ maxWidth: 100 }}>
      {data.info}
    </Link>
  )

  if (!tooltip) return inner

  return (
    <Tooltip
      placement="top"
      align={{ offset: [0, -10] }}
      trigger="hover"
      overlay={
        <div className="operator-tooltip">
          <div className="operator-tooltip-column">
            <span className="bold">{data.info}</span>
            <p>运营商名称</p>
          </div>
          <div className="operator-tooltip-column">
            <span className="bold">{data.reputation}</span>
            <p>声誉值</p>
          </div>
          <div className="operator-tooltip-column">
            <span className="bold">{data.nodeIDs.length} 个</span>
            <p>累计运营节点</p>
          </div>
        </div>
      }
      destroyTooltipOnHide={true}
    >
      {inner}
    </Tooltip>
  )
}

export default RenderOperatorsItem
