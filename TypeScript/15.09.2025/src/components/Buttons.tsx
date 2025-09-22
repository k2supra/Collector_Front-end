import React from 'react'
import './buttons.css'

type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
};

export function Button({label, onClick, variant}:ButtonProps) {
  return <button onClick={onClick} className={variant}>{label}</button>
}