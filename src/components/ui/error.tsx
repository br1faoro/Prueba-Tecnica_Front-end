import { STATES } from '@/constants/messages';

const Error: React.FC = () => (
  <div className="error" style={{ height: '804px', padding: '10rem' }}>
    <div className='error__message'>{STATES.error}</div>
  </div>
);

export default Error;
