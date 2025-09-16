"use client";

import React from 'react';


type ButtonType = 'button' | 'submit' | 'reset' | undefined;
interface Props {
  children: React.ReactNode; // represents a React element, an array of React elements, or a string, number, or boolean
  handleClick?: () => void; // doesn't return any data, when called but can execute any function inside of it.
  styles: string;
  type?: ButtonType;
  title: string;
  disabled?: boolean;
}

const Button = (props:Props) => {

const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <button
        onClick={handleClick}
        className={`${props.styles} next bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors`}
        type={props?.type}
        title={props.title}
        disabled={props?.disabled}
        >
            {props.children}
    </button>
  );
};



export default Button;