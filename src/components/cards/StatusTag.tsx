import React from 'react'
import { StatusTypes } from '../../types/types'

export const Status: React.FC<{
  type: StatusTypes
  text: string
}> = ({ type, text }) => {
  return (
    <div
      className={`
      lowercase
      ${type === 'new' && 'bg-success-light text-success'}
      ${type === 'processing' && 'bg-danger-light text-danger'}
      ${type === 'fulfilled' && 'bg-warn-light text-warn'}
      px-4 py-[1px]
      font-medium
      border border-transparent
      rounded-full
      w-fit
        `}
    >
      {text}
    </div>
  )
}
