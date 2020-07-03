import React from 'react'
import { Link } from 'react-router-dom'

export default function Title() {
  return (
    <div className="Title">
      <Link to="/" className="Title__wrapper">
        <div className="Title__scroll" />
        <h1>Dustballs</h1>
      </Link>
    </div>
  )
}
