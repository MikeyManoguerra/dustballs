import React from 'react'
import { useWindowDimensions } from '../hooks'
import { Title, Navigation } from '../components'

export default function Header() {
  const { width } = useWindowDimensions()

  return (
    <header className="Header">
      {width < 640 ? <Title /> : <Navigation />}
    </header>
  )
}
