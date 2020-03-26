import React, { useEffect, useState } from 'react'
import useApp from '../../service/useApp'
import Spinner from '../Spinner'
import ParticipantList from './ParticipantList'
import './style.css'

const Participant: React.FC = () => {
  const allNodeList = useApp(state => state.allNodeList)
  const updateNodeInfoList = useApp(state => state.updateNodeInfoList)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    updateNodeInfoList().finally(() => setLoading(false))
  }, [updateNodeInfoList])

  return (
    <div className="container">
      <a className="participant-join-link" href="https://github.com/PoolDAO/dapp/issues/12" target="_blank">
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
