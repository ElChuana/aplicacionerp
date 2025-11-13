// components/RutInput.tsx
import React from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd';

function formatRut(value: string): string {
  // Eliminar todo lo que no sea dígito o K/k
  const cleaned = value.replace(/[^0-9kK]/g, '').toUpperCase();
  if (cleaned.length === 0) return '';

  // Si sólo hay un carácter, devolverlo tal cual (puede ser el dígito o la K)
  if (cleaned.length === 1) return cleaned;

  // Separar dígitos y dígito verificador
  const dv = cleaned.slice(-1);
  const nums = cleaned.slice(0, -1);

  // Formatear número: invértelo, agrupa de a 3, vuelve a invertir, une con puntos
  const reversed = nums.split('').reverse().join('');
  const chunks = reversed.match(/\d{1,3}/g) || [];
  const formattedNum = chunks.join('.').split('').reverse().join('');

  return `${formattedNum}-${dv}`;
}

interface RutInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
}

export const RutInput: React.FC<RutInputProps> = ({ value = '', onChange, ...rest }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    onChange?.(formatted);
  };

  return <Input {...rest} value={value} onChange={handleChange} />;
};
