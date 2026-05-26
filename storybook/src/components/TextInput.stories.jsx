import { TextInput } from './TextInput';
import { useState } from 'react';

export default {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    invalid: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: {
    label: 'Enter your name',
    placeholder: 'John Doe',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled input',
    placeholder: 'Cannot type here',
    disabled: true,
  },
};

export const WithError = {
  args: {
    label: 'Email address',
    placeholder: 'your@email.com',
    invalid: true,
    invalidText: 'Please enter a valid email address',
  },
};

export const WithValue = {
  args: {
    label: 'Pre-filled input',
    value: 'Some existing value',
  },
};

export const Interactive = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <TextInput
        label="Type something"
        placeholder="Start typing..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};
