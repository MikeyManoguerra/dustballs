import React from 'react'

interface StageProps {
  children: JSX.Element
}

export default function Stage(props: StageProps) {
  return (
    <div className="Stage">
      <div className="Stage__valance">
      </div>
      <div className="Stage__space">
        <div className="Stage__column">
          <div className="Stage__columnTop">
          </div>
        </div>
        <div className="Stage__formWrapper">
          {props.children}
        </div>
        <div className="Stage__column"></div>
      </div>
    </div>
  )
}
