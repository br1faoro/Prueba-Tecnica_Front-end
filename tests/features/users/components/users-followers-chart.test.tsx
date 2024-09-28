import React from 'react';
import { render, screen } from '@testing-library/react';
import { UsersFollowersChart } from '@/features/users/components';
import { STATES } from '@/constants/messages';
import { MOCK_USER_ARRAY } from '@tests/__mocks__';

jest.mock('recharts', () => {
  const OriginalRecharts = jest.requireActual('recharts');
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    BarChart: ({ children }: { children: React.ReactNode }) => <svg data-testid="bar-chart">{children}</svg>,
    Bar: ({ dataKey, fill }: { dataKey: string; fill: string }) => (
      <rect data-testid={`bar-${dataKey}`} fill={fill}></rect>
    ),
    CartesianGrid: () => <line data-testid="cartesian-grid" />,
    Tooltip: ({ content }: { content: React.ReactNode }) => <div data-testid="tooltip">{content}</div>,
    XAxis: () => <g data-testid="x-axis" />,
  };
});

describe('UsersFollowersChart Component', () => {
  it('renders children correctly', () => {
    render(<UsersFollowersChart users={MOCK_USER_ARRAY} />);
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('bar-followers')).toBeInTheDocument();
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
  });

  it('renders empty message when users is empty', () => {
    render(<UsersFollowersChart users={[]} />);
    expect(screen.getByText(STATES.empty)).toBeInTheDocument();
  });
});
