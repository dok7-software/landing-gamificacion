import type { CSSProperties } from 'react';

interface FormFieldProps {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 10,
  color: 'white',
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
};

export function FormField({ label, placeholder, type = 'text', value, onChange, required }: FormFieldProps) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 8 }}>
        {label}
        {required && <span style={{ color: '#7c5cfc' }}> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        style={inputStyle}
      />
    </div>
  );
}

interface FormSelectProps {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}

export function FormSelect({ label, options, value, onChange }: FormSelectProps) {
  const selectedValue = value ?? options[0];
  const isPlaceholder = selectedValue === options[0];

  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 8 }}>{label}</label>
      <select
        value={selectedValue}
        onChange={(e) => onChange?.(e.target.value)}
        style={{ ...inputStyle, color: isPlaceholder ? 'rgba(255,255,255,0.5)' : '#ffffff', appearance: 'none', cursor: 'pointer' }}
      >
        {options.map((option) => (
          <option key={option} value={option} style={{ backgroundColor: '#10142a', color: '#ffffff' }}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

interface FormTextareaProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
}

export function FormTextarea({ label, placeholder, value = '', onChange, maxLength = 1000 }: FormTextareaProps) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 8 }}>{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange?.(e.target.value)}
        style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
      />
      <div style={{ textAlign: 'right', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>
        {value.length}/{maxLength}
      </div>
    </div>
  );
}
