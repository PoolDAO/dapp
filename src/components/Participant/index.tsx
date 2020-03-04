import React, { useEffect, useState, useCallback } from 'react'

import useApp, { useAppApi } from '../../service/useApp'
import ParticipantList from './ParticipantList'
import Spinner from '../Spinner'

import './style.css'

const Participant: React.FC = () => {
  const provider = useApp(state => state.provider)
  const currentAccount = useApp(state => state.currentAccount)
  const allNodeList = useApp(state => state.allNodeList)
  const [loading, setLoading] = useState(false)

  const getNodeInfoList = useCallback(async () => {
    const result = await provider.getNodeList()
    useAppApi.setState(state => {
      state.allNodeList = result
    })
  }, [provider, currentAccount])

  useEffect(() => {
    setLoading(true)
    getNodeInfoList().finally(() => setLoading(false))
  }, [getNodeInfoList])

  return (
    <div className="container">
      <a className="participant-join-link" href="#">
        想成为运营商，为用户提供运营节点?
      </a>
      {loading ? (
        <div className="spinner-center">
          <Spinner />
        </div>
      ) : (
        <ParticipantList data={allNodeList} />
      )}
    </div>
  )
}

export default Participant
