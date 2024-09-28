import { render, screen } from '@testing-library/react';
import { Section } from '@/components/common';

describe('Section Component', () => {
  it('renders children correctly', () => {
    render(<Section>Test content</Section>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    render(
      <Section>
        <h1>Test title</h1>
        <p>Test paragraph</p>
      </Section>
    );
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test paragraph')).toBeInTheDocument();
  });

  it('renders different types of children correctly', () => {
    render(
      <Section>
        {42}
        {false}
        <span>Span Element</span>
        <>
          <div>Fragment Div</div>
        </>
      </Section>
    );
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.queryByText('false')).not.toBeInTheDocument();
    expect(screen.getByText('Span Element')).toBeInTheDocument();
    expect(screen.getByText('Fragment Div')).toBeInTheDocument();
  });

  it('renders children correctly with additional attributes', () => {
    const { container } = render(
      <Section data-testid="section" data-custom="custom">
        Test content
      </Section>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'section');
    expect(container.firstChild).toHaveAttribute('data-custom', 'custom');
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders without className when not provided', () => {
    const { container } = render(<Section>Test content</Section>);
    expect(container.firstChild).not.toHaveAttribute('class');
  });

  it('renders children correctly with custom class', () => {
    render(<Section className="custom-class">Test content</Section>);
    expect(screen.getByText('Test content')).toHaveClass('custom-class');
  });

  it('renders without className when not provided', () => {
    const { container } = render(<Section>Test content</Section>);
    expect(container.firstChild).not.toHaveAttribute('class');
  });

  it('renders with empty className', () => {
    const { container } = render(<Section className="">Test content</Section>);
    expect(container.firstChild).toHaveAttribute('class', '');
  });
});
