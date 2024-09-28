import { STATES } from '@/constants/messages';

const Loading: React.FC = () => (
  <div className="loading">
    <div className="loading__mesage">{STATES.loading}</div>
  </div>
);

export default Loading;
