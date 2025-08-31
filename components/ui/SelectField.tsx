'use client';
import React from 'react';
import { clsx } from 'clsx';

type Option = { label: string; value: string };

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
  error?: string;
  hint?: string;
};

export default function SelectField({ label, options, error, hint, className, ...rest }: Props) {
  return (
    <div>
      <label className="label">{label}</label>
      <select className={clsx('input', error && 'border-red-500', className)} {...rest}>
        <option value="">Pilih...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {hint && !error && <p className="help">{hint}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
