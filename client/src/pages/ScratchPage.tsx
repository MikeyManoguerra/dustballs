import React ,{ReactNode} from 'react'
import {Link} from 'react-router-dom'
import { ReactComponent as Dustball } from "../assets/dustball-chill.svg";

interface StageProps {
  children?: ReactNode
}

export default function StagePage(props : StageProps) {
  // const { children } = props.children
  return (
    <div className="Stage">
     <Link to="/">go back</Link>

     <div>
      <Dustball></Dustball>
     </div>
    </div>
  )
}
