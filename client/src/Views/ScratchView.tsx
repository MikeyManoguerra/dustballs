import React ,{ReactNode} from 'react'
import {Link} from 'react-router-dom'

interface StageProps {
  children?: ReactNode
}

export default function StageView(props : StageProps) {
  // const { children } = props.children
  return (
    <div className="Stage">
     <Link to="/">go back</Link>
    </div>
  )
}
