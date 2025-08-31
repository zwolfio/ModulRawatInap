'use client';
import React from 'react';
import { clsx } from 'clsx';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export default function InputField({ label, error, hint, className, ...rest }: Props) {
  return (
    <div>
      <label className="label">{label}</label>
      <input className={clsx('input', error && 'border-red-500', className)} {...rest} />
      {hint && !error && <p className="help">{hint}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
