import { Button } from 'antd'
import React, { useCallback, useMemo } from 'react'
import { NodeInfo } from '../../service/Pooldao'
import useApp from '../../service/useApp'
import InvestDialog from '../Invest'
import BN from 'bn.js'

type HandleParticipateProps = {
  data: NodeInfo
}

const HandleParticipate: React.FC<HandleParticipateProps> = ({ data }) => {
  const provider = useApp(state => state.provider)
  const currentAccount = useApp(state => state.currentAccount)
  const updateNodeInfoList = useApp(state => state.updateNodeInfoList)

  const [investDialogVisible, setInvestDialogVisible] = React.useState(false)

  const handleClick = useCallback(() => {
    setInvestDialogVisible(true)
  }, [setInvestDialogVisible])

  const handleSubmit = useCallback(
    async (value: number) => {
      await provider.userDeposit(currentAccount, data.address, value)
      updateNodeInfoList()
      setInvestDialogVisible(false)
    },
    [
      provider,
      currentAccount,
      setInvestDialogVisible,
      data.address,
      updateNodeInfoList,
    ]
  )

  const depositMap = data.depositList.reduce((r: any, c: any) => {
    const value = new BN(c.value)
    if (!r[c.addr]) {
      r[c.addr] = value
    } else {
      r[c.addr] = value.add(r[c.addr])
    }
    return r
  }, {} as any)

  const myDeposit = Number(
    data.owner === currentAccount
      ? data.operatorDeposit
      : depositMap[currentAccount] || 0
  )

  return (
    <>
      {data.statusText === '募集中' ? (
        !myDeposit ? (
          <Button
            className="table-btn"
            style={{ marginRight: '10px' }}
            onClick={handleClick.bind(null)}
          >
            我要参与
          </Button>
        ) : (
          <Button className="table-btn is-static-btn">已参与</Button>
        )
      ) : !myDeposit ? null : (
        <Button className="table-btn is-static-btn">已参与</Button>
      )}

      <InvestDialog
        visible={investDialogVisible}
        onClose={setInvestDialogVisible.bind(null, false)}
        onSelect={handleSubmit}
      />
    </>
  )
}

export default HandleParticipate
