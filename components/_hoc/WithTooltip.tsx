import { ReactNode } from 'react';
import { Tooltip, Position } from 'react-tippy';

const WithTooltip = ({
  children,
  tooltipText,
  disabled,
  position = 'top',
}: {
  children: ReactNode,
  tooltipText: string,
  disabled?: boolean,
  position?: Position,
}) => (
  <Tooltip
    disabled={disabled}
    title={tooltipText}
    position={position}
    trigger="mouseenter"
    arrow
    distance={12}
  >
    {children}
  </Tooltip>
);

export default WithTooltip;
