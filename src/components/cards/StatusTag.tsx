import React from 'react'
import { PaymentTypes, StatusTypes } from '../../types/types'

export const Status: React.FC<{
  type: StatusTypes | PaymentTypes
  text: string
}> = ({ type, text }) => {
  return (
    <div
      className={`
      lowercase
      ${type === 'success' && 'bg-success-light text-success'}
      ${type === 'fail' && 'bg-danger-light text-danger'}
      ${type === 'warn' && 'bg-warn-light text-warn'}
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
