import React from 'react';
import { Container } from './styles';

interface TooltTipProps {
  title: string;
  className?: string;
}
const TooltTip: React.FC<TooltTipProps> = ({
  children,
  title,
  className = '',
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};
export default TooltTip;
