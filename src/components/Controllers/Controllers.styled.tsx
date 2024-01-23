import React from 'react';
import styled from 'styled-components';

import { NextIconSvg } from '@/assets/icons/NextIcon/NextIcon';
import { PrevIconSvg } from '@/assets/icons/PrevIcon/PrevIcon';
import { ElementColor, ElementColorOptions } from '@/types/ColorOptions';

export const ControllersWrapper = styled.div<{
  $colors?: ElementColorOptions;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  font-weight: 700;
  color: ${(props) => props.$colors?.text || '#000'};
  background-color: ${(props) => props.$colors?.background || 'none'};

  user-select: none;
`;

export const PrevControllerIcon = styled(PrevIconSvg)`
  cursor: pointer;
`;
export const NextControllerIcon = styled(NextIconSvg)`
  cursor: pointer;
`;
