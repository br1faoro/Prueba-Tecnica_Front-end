import { render, screen } from '@testing-library/react';
import { Title } from '@components/common';

describe('Title Component', () => {
  it('renders children correctly', () => {
    render(<Title>Test title</Title>);
    expect(screen.getByText('Test title')).toBeInTheDocument();
  });

  it('renders with h1 tag', () => {
    render(<Title>Test title</Title>);
    expect(screen.getByText('Test title').tagName).toBe('H1');
  });
});
