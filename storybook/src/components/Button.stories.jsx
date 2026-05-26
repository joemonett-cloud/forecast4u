import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export const Primary = {
  args: {
    children: 'Click me',
    kind: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'Click me',
    kind: 'secondary',
  },
};

export const Danger = {
  args: {
    children: 'Delete',
    kind: 'danger',
  },
};

export const Ghost = {
  args: {
    children: 'Cancel',
    kind: 'ghost',
  },
};

export const Disabled = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const Large = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Small = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};
