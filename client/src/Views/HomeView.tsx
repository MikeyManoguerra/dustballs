import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeView() {
  return (
    <div className="Home">
      <div className="PlayView__background">
        <img src="/images/wood-texture.jpg" alt="" className="PlayView__bgImage" />
      </div>
      <div className="Home__inner">
        <div className="Home__header">
          <h1 className="Home__heading">Dustballs dot app</h1>
          <p className="Home__copy">You never know what treasure you might find sweapt into the corner</p>
        </div>
        <ul className="Home__linkList">
          <li className="Home__linkListItem">
            <Link className="Home__link" to="/sonnets">Sonnets</Link>
          </li>
          <li className="Home__linkListItem">
            <Link className="Home__link" to="/plays">Plays</Link>
          </li>
        </ul>
        <div className="Home__imageWrapper">
          <img
            className="Home__image"
            src="images/theatre.jpg"
            alt="placeholder"
          />
        </div>
      </div>
    </div>
  )
}

