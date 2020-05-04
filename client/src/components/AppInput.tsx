import React, { ChangeEvent } from 'react'

interface InputProps {
  value: string
  name: string
  onChange: (v: ChangeEvent<HTMLInputElement>) => void
}

export default function AppInput(props: InputProps) {
  return (
    <input
      {...props}
      type="text"
      className="AppInput"
    />
  )
}
