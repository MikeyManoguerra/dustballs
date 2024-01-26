import React, { ChangeEvent } from 'react'
import { ReactComponent as Dustball } from "../assets/dustball-chill.svg";

interface SpriteProps {

}

export function Sprite({ }: SpriteProps) {
  return (
    <Dustball width={200} height={200}></Dustball>
  )
}
