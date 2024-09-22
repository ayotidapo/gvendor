import React from 'react'

interface SwitchProps {
  checked: boolean
  disabled?: boolean
}
const Switch: React.FC<SwitchProps> = ({ checked, disabled }): JSX.Element => {
  return (
    <label htmlFor="one" className="switch-label inline-block relative">
      <input
        id="one"
        type="checkbox"
        defaultChecked={checked}
        disabled={disabled}
      />
    </label>
  )
}

export default Switch
