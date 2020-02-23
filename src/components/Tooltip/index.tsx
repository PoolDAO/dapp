import React from 'react'

import ATooltip, { TooltipProps as ATooltipProps } from 'antd/es/tooltip'

interface TooltipProps {
  placement: ATooltipProps['placement']
  content: string
}

const Tooltip: React.FC<TooltipProps> = ({ placement, content, ...rest }) => {
  return <ATooltip placement={placement} title={content} {...rest} />
}

export default Tooltip
