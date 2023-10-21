import React from 'react';
import '../../assets/scss/components/UI/_input.scss';

interface InputProps {
  placeholder: string;
  type?: 'password' | 'text';
  isNumber?: boolean;
  value: string;
  setValue: (val: string) => void;
  svgIcon?: string;
  className?: string;
  isCode?: boolean;
}

const Input = ({ placeholder, type = 'text', value, className, isCode, isNumber, setValue, svgIcon }: InputProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isCode) {
      if (isNumber) {
        // тут сделано через маску
        if (!e.target.value.match(/\D/g) && +e.target.value.length < 8) {
          setValue(e.target.value);
        }
      } else {
        setValue(e.target.value);
      }
    }
  };

  return (
    <div className="inputWrap">
      <input
        className={`input ${svgIcon ? 'inputPaddingRight' : ''} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        type={type}
      />
      {svgIcon && <img className="rubleIcon" src={svgIcon} alt="" />}
    </div>
  );
};

export default Input;
