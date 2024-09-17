'use client'

import React, { ChangeEvent, ReactNode, useState } from 'react'
import {Icon} from '../icon/icon'

export const Input = ({
  type = 'text',
  title = '',
  name = '',
  value = '',
  placeholder = 'Placeholder',
  onChange = (val: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {},
  onBlur = () => {},
  hasIcon = true,
  iconSvg = '',
  iconDimension = 20,
  inputClass = '',
  className = '',
  errors = '',
  autoComplete = 'off',
  readOnly = false,
  rows = 3,
  extra,
  ...inputProps
}: {
  type?: string
  title?: string
  name?: string
  value?: string
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void
  hasIcon?: boolean
  iconSvg?: string
  iconDimension?: number
  inputClass?: string
  className?: string
  errors?: string
  rows?: number
  autoComplete?: 'off' | 'on'
  readOnly?: boolean
  extra?: ReactNode
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const inputClassName = `
          bg-[transparent] w-full
          outline-none focus:outline-none
          placeholder:text-neutral font-normal
          autofill:focus:bg-transparent autofill:bg-transparent
          text-base
          ${inputClass}
        `

  return (
    <div>
      {title && <span className="mb-2 text-sm">{title}</span>}
      <div
        className={`
        w-full flex flex-row gap-4
        items-center
        border border-divider-gray
        rounded-md bg-transparent
        text-black
        p-4
        focus-within:!border-black
        transition-all duration-300
        ${className}
      `}
      >
        {hasIcon && (
          <Icon
            id={iconSvg}
            width={iconDimension}
            height={iconDimension}
            className="min-w-fit"
          />
        )}
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
            readOnly={readOnly}
            className={inputClassName}
            rows={rows}
          />
        ) : (
          <input
            type={type === 'password' && showPassword ? 'text' : type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
            readOnly={readOnly}
            className={inputClassName}
            {...inputProps}
          />
        )}
        {extra && extra}
        {type === 'password' && (
          <button
            onClick={() => {
              setShowPassword(!showPassword)
            }}
            type="button"
          >
            <Icon
              id={showPassword ? 'hide' : 'show'}
              width={24}
              height={24}
              className="min-w-fit"
            />
          </button>
        )}
      </div>

      {errors && (
        <span
          className="
          text-sm text-danger
          block p-2 font-normal
          "
        >
          {errors}
        </span>
      )}
    </div>
  )
}
