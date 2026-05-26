import { Button as CarbonButton } from '@carbon/react';

export function Button({
  children,
  kind = 'primary',
  size = 'lg',
  disabled = false,
  onClick,
}) {
  return (
    <CarbonButton
      kind={kind}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </CarbonButton>
  );
}
