import React from 'react';
import styled from 'styled-components';

import { ReactComponent as NextIcon } from '@/assets/icons/Next.svg';
import { ReactComponent as PrevIcon } from '@/assets/icons/Prev.svg';
import { ElementColorOptions } from '@/types/ColorOptions';

export const ControllersWrapper = styled.div<{
  $colors?: ElementColorOptions;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  font-weight: 700;
  color: ${(props) => props.$colors?.text || 'inherit'};
  background-color: ${(props) => props.$colors?.background || 'none'};
`;

export const PrevControllerIcon = styled((props: { onClick: () => void }) => (
  <PrevIcon {...props} />
))`
  cursor: pointer;
`;
export const NextControllerIcon = styled((props: { onClick: () => void }) => (
  <NextIcon {...props} />
))`
  cursor: pointer;
`;
