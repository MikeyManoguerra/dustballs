import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <div className="Navigation">
      <div className="Navigation__accents">
        <div className="Navigation__accentLeft" />
        <div className="Navigation__accentRight" />
      </div>
      <nav className="Navigation__nav">
        <ul className="Navigation__list">
          <li className="Navigation__listItem">
            <Link className="Navigation__link Navigation__link--arch" to="/plays">Plays</Link>
          </li>
          <li className="Navigation__listItem">
            <Link className="Navigation__link Navigation__link--arch" to="/sonnets">Sonnets</Link>
          </li>
          <li className="Navigation__listItem">
            <Link className="Navigation__link" to="/">
              <span aria-label="home" className="Navigation__homePlaceHolder" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
