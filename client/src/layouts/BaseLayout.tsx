import React from 'react'
import { Link } from 'react-router-dom'
import { Footer, Header } from '../components'

interface BaseLayoutProps {
  children: React.ReactNode;
}
export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <Header></Header>

      <main>
        <div className="Home">
          <div className="PlayPage__background">
            <img src="/images/wood-texture.jpg" alt="" className="PlayPage__bgImage" />
          </div>
          <div className="Home__inner">
            {children}
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  )
}
