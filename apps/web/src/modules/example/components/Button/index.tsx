import React from 'react'

import { ButtonProps } from './types'

const Button = ({ onClick, text }: ButtonProps) => {
  return <button onClick={onClick}>{text}</button>
}

export default Button
