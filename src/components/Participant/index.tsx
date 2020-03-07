import React, { useEffect, useState, useCallback } from 'react'

import useApp, { useAppApi } from '../../service/useApp'
import ParticipantList from './ParticipantList'
import Spinner from '../Spinner'

import './style.css'

const Participant: React.FC = () => {
  const provider = useApp(state => state.provider)
  const allNodeList = useApp(state => state.allNodeList)
  const updateNodeInfoList = useApp(state => state.updateNodeInfoList)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    updateNodeInfoList().finally(() => setLoading(false))
  }, [updateNodeInfoList])

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
