import React from 'react'
import { AppLinkPrimary } from '../components'

function HomeView() {
  return (
    <div className="Home">
      <div className="Home__inner">
        <div className="Home__header">
          <h1 className="Home__heading">Dustball dot app</h1>
          <p className="Home__copy"> never know what you might find swept into the corner</p>
        </div>
        <ul className="Home__linkList">
          <li className="Home__linkListItem">
            <AppLinkPrimary to="/sonnets">sonnets</AppLinkPrimary>
          </li>
          <li className="Home__linkListItem">
            <AppLinkPrimary to="/plays">Plays</AppLinkPrimary>
          </li>
        </ul>
        <div className="Home__imageWrapper">
          <img
            className="Home__image"
            src="https://source.unsplash.com/random"
            alt="placeholder"
          />
        </div>
      </div>
    </div>
  )
}

export default HomeView
