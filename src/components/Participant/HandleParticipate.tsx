import React, { useState, useCallback, useMemo } from 'react'
import { notification } from 'antd'

import InvestDialog from '../Invest'
import { NodeInfo } from '../../service/Pooldao'
import useApp, { useAppApi } from '../../service/useApp'

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
    [provider, currentAccount, setInvestDialogVisible, data.id]
  )

  const isDeposited = useMemo(() => {
    return !!data.depositList.find(({ addr }) => {
      return addr === currentAccount
    })
  }, [data.depositList, currentAccount])

  return (
    <>
      {!isDeposited ? (
        <a
          href="#"
          className="table-btn"
          style={{ marginRight: '10px' }}
          onClick={handleClick.bind(null)}
        >
          我要参与
        </a>
      ) : (
        <a
          href="#"
          className="table-btn is-static-btn"
          style={{ marginRight: '10px' }}
          onClick={() => {}}
        >
          已参与
        </a>
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
