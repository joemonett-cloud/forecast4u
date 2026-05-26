import { Card } from './Card';
import './Card.css';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    title: 'Card Title',
    description: 'This is a card description',
    children: 'Card content goes here',
  },
};

export const WithoutDescription = {
  args: {
    title: 'Just a Title',
    children: 'Some content without a description',
  },
};

export const WithComplexContent = {
  args: {
    title: 'Feature Card',
    description: 'Learn about our amazing features',
    children: (
      <div>
        <ul>
          <li>Feature One</li>
          <li>Feature Two</li>
          <li>Feature Three</li>
        </ul>
      </div>
    ),
  },
};

export const Minimal = {
  args: {
    children: 'Simple card content',
  },
};
