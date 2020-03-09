import React from 'react'
import BN from 'bn.js'

import { fromPrecision } from '../../utils'

function numberToAmount(
  number: BN,
  {
    postfix = '',
    prefix = '',
    minDigits = 3,
    precision = 0,
    useGrouping = true,
  }: {
    postfix?: string
    prefix?: string
    precision?: number
    useGrouping?: boolean
    minDigits?: number
  } = {}
) {
  const value = fromPrecision(number, precision, {
    pad: true,
    minDigits,
    commify: useGrouping,
  })

  return `${prefix}${value}${postfix ? ' ' : ''}${postfix}`
}

export default function Amount(props: {
  value: BN | string | number
  precision?: number
  minDigits?: number
  useGrouping?: boolean
  postfix?: string
  prefix?: string
  component?: React.ElementType
  className?: string
}) {
  const {
    value,
    precision = 18,
    minDigits = 3,
    useGrouping = true,
    postfix = '',
    prefix = '',
    component: Component = 'span',
    ...other
  } = props

  const options: any = {
    precision,
    useGrouping,
    minDigits,
    postfix,
    prefix,
  }

  const number = BN.isBN(value) ? value : new BN(String(value || 0))

  return <Component {...other}>{numberToAmount(number, options)}</Component>
}
