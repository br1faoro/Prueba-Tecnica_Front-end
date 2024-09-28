import { ReactNode } from 'react';

interface TitleProps {
  children?: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return <h1 className="title title--center">{children}</h1>;
};

export default Title;
