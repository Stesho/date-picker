import React from 'react';

import {
  ControllersWrapper,
  NextControllerIcon,
  PrevControllerIcon,
} from './Controllers.styled';

export interface ControllersProps {
  controllersCaption: string;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const Controllers = ({
  controllersCaption,
  onPrevClick,
  onNextClick,
}: ControllersProps) => (
  <ControllersWrapper>
    <PrevControllerIcon onClick={onPrevClick} />
    <span>{controllersCaption}</span>
    <NextControllerIcon onClick={onNextClick} />
  </ControllersWrapper>
);
