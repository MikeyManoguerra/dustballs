import React from 'react'
import { useWindowDimensions } from '../hooks'
import { Title, Navigation } from '../components'

export default function Footer() {
  const { width } = useWindowDimensions()

  return (
    <footer className="Footer">
      {width >= 640 ? <Title /> : <Navigation />}
    </footer>
  )
}
