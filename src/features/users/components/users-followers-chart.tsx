import { createContext, isValidElement, ReactNode } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { STATES } from '@/constants/messages';

const ChartContext = createContext<null>(null);

const ChartContainer: React.FC<{ children: ReactNode }> = ({ children, ...props }) => {
  return (
    <ChartContext.Provider value={null}>
      <div className="chart" {...props}>
        {isValidElement(children) && <ResponsiveContainer>{children}</ResponsiveContainer>}
      </div>
    </ChartContext.Provider>
  );
};

interface ChartCustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const ChartCustomTooltip: React.FC<ChartCustomTooltipProps> = ({ payload, label }) => {
  return (
    <div className="tooltip">
      <p>{label}</p>
      <p>{payload![0]?.value}</p>
    </div>
  );
};

interface User {
  login: string;
  followers: number;
}

interface UsersFollowersChartProps {
  users: User[];
}

const UsersFollowersChart: React.FC<UsersFollowersChartProps> = ({ users }) => {
  return (
    <ChartContainer>
      {users.length === 0 ? (
        <div className="chart__message">{STATES.empty}</div>
      ) : (
        <BarChart data={users} accessibilityLayer>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            cursor={{ fill: 'var(--coal-dark)' }}
            content={<ChartCustomTooltip active={false} payload={[]} label={''} />}
          />
          <XAxis dataKey="login" tickLine={false} tickMargin={10} axisLine={false} tick={{ fill: 'var(--beige)' }} />
          <Bar dataKey="followers" radius={4} fill="var(--yellow)" />
        </BarChart>
      )}
    </ChartContainer>
  );
};

export default UsersFollowersChart;
