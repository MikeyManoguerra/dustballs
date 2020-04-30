import React from 'react'
import { Link } from 'react-router-dom'

interface LinkProps {
  children: string
  to: string
}

export default function AppLinkPrimary(props: LinkProps) {
  const { to, children } = props

  return (
    <Link to={to} className="AppLinkPrimary">
      {children}
    </Link>
  )
}
