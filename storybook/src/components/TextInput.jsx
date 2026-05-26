import { TextInput as CarbonTextInput } from '@carbon/react';

export function TextInput({
  label = 'Input label',
  placeholder = 'Enter text...',
  disabled = false,
  invalid = false,
  invalidText = 'This is invalid',
  value,
  onChange,
}) {
  return (
    <CarbonTextInput
      id="text-input"
      labelText={label}
      placeholder={placeholder}
      disabled={disabled}
      invalid={invalid}
      invalidText={invalidText}
      value={value}
      onChange={onChange}
    />
  );
}
