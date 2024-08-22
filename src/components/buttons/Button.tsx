import { Gilroy } from '@/fonts/font';
import clsx from 'clsx';
import { FC } from 'react';
import { Icon } from '../icon/icon';
import { ArrowDown, ChevronDown, ListFilter } from 'lucide-react';

type ButtonProps = {
  label: string;
  additionalClass?: string;
  arrow?: boolean;
  svg?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  name?: 'primary' | 'inverted' | 'outline';
  loading?: boolean;
  spinColor?: string;
  small?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  filter?: boolean;
  download?: boolean;
};

const Button: FC<ButtonProps> = ({
  label,
  arrow,
  type,
  onClick,
  additionalClass,
  disabled,
  name = 'primary',
  small = false,
  filter = false,
  download = false,
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
          'bg-transparent text-black': name === 'outline',
          'text-sm py-2': small,
          'py-3': !small,
          'border border-gray-100': name === 'inverted',
          'outline outline-1  ': name === 'outline',
          'opacity-10': disabled,
        },
        additionalClass
      )}
    >
      {download && <ArrowDown width={24} />}
      {filter && <ListFilter width={24} />}

      {label}
      {arrow && (
        <span className=''>
          <ChevronDown width={24} />
        </span>
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
