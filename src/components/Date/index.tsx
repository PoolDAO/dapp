import React from 'react'
import dayjs from 'dayjs'

type DateProps = {
  value: number
  format?: string
}

const Date: React.FC<DateProps> = ({
  value,
  format = 'YYYY-MM-DD HH:mm:ss',
}) => {
  if (!value) return null
  return <>{(dayjs.unix(value)).format(format)}</>
}

export default Date
