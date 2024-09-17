'use client'

import React from 'react'
import './Spinner.css'
import { Oval } from 'react-loader-spinner'
import { PRIMARY_COLOR } from '../../constants'

export const LoadingOval: React.FC<{
  loaderHeight: string
  loaderWidth: string
  color?: string
}> = ({ loaderHeight = '25', loaderWidth = '25', color = '#ffffff' }) => {
  return (
    <Oval
      visible={true}
      height={loaderHeight}
      width={loaderWidth}
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
      color={color}
      strokeWidth={1}
      strokeWidthSecondary={5}
    />
  )
}

const Spinner = ({
  fullScreen = true,
}: {
  fullScreen?: boolean
}): JSX.Element => {
  return (
    <div
      className={`${
        fullScreen ? 'h-screen' : ''
      } flex items-center justify-center`}
    >
      <LoadingOval loaderHeight="30" loaderWidth="30" color={PRIMARY_COLOR} />
    </div>
  )
}

export default Spinner
