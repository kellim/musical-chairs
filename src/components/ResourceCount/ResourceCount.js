import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ResourceCount.css'

function ResourceCount(props) {

  const { numberLeft, faIcon } = props
  return (
    <div className="ResourceCount">
      <div className="ResourceCount-icon">
        <FontAwesomeIcon icon={faIcon} />
      </div>
      <div className="ResourceCount-number">{numberLeft}</div>
    </div>
  )
}

export default ResourceCount