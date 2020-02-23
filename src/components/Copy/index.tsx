import React from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'

interface CopyProps {
  text: string
  onCopy: () => void
}

const Copy: React.FC<CopyProps> = ({ text, onCopy, ...rest }) => {
  return <CopyToClipboard text={text} onCopy={onCopy} {...rest} />
}

export default Copy
