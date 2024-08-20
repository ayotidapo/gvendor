import { Gilroy } from '@/fonts/font';
import clsx from 'clsx';
import { FC } from 'react';
import { Icon } from '../icon/icon';
import CircularSpinner from '../loaders/CircularSpinner';

type ButtonProps = {
  label: string;
  additionalClass?: string;
  arrow?: boolean;
  svg?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  name?: 'primary' | 'inverted' | 'secondary' | 'outline' | 'transparent';
  loading?: boolean;
  spinColor?: string;
  small?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({
  label,
  arrow,
  svg,
  type,
  spinColor,
  loading,
  onClick,
  additionalClass,
  disabled,
  name = 'primary',
  small = false,
}) => {
  return (
    <button
      type={type ? type : 'submit'}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'w-full rounded-md flex gap-2 justify-center items-center relative px-3',
        {
          'bg-black text-white': name === 'primary',
          'bg-white text-black shadow-lg': name === 'inverted',
          'bg-brand-orange text-white': name === 'secondary',
          'bg-transparent text-black': name === 'outline',
          'text-sm py-2': small,
          'py-3': !small,
          'border border-gray-100': name === 'inverted',
          'outline outline-1  ': name === 'outline',
          'opacity-10': disabled,
          'bg-transparent text-black  border-black': name === 'transparent',
        },
        additionalClass
      )}
    >
      {svg && (
        <div className=''>
          <Icon width={24} height={24} svg={svg} />
        </div>
      )}
      {loading ? (
        <div className={`cursor-pointer flex justify-center`}>
          <CircularSpinner color={spinColor} />
        </div>
      ) : (
        <>
          {label}
          {arrow && (
            <span className='ml-2'>
              <Icon width={8} height={13} svg='right-arrow' />
            </span>
          )}
        </>
      )}
    </button>
  );
};

export const LinkButton: FC<ButtonProps> = ({
  label,
  arrow,
  additionalClass,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-transparent underline text-dark-gray ${Gilroy.className} ${additionalClass}`}
    >
      {label}
      {arrow && (
        <span className='ml-1 mt-[0.4rem]'>
          <Icon width={8} height={13} svg='right-arrow' />
        </span>
      )}
    </button>
  );
};

export default Button;
