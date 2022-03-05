import React from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { Icon } from 'components';

export interface IButtonProps extends ButtonProps {
  className?: string;
  loading?: boolean;
  loadingIconSize?: number;
  loadingIconColor?: string;
}

export const Button = ({
  className,
  children,
  loading,
  loadingIconSize,
  loadingIconColor,
  ...restProps
}: IButtonProps) => (
  <MuiButton className={className} {...restProps}>
    {loading && <Icon size={loadingIconSize} color={loadingIconColor} name="loading" />}
    {children}
  </MuiButton>
);
