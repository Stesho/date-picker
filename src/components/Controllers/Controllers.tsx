import React, { useContext } from 'react';

import { ColorContext } from '@/context/colorContext';

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
}: ControllersProps) => {
  const colors = useContext(ColorContext);

  return (
    <ControllersWrapper $colors={colors.calendar?.controllers}>
      <PrevControllerIcon onClick={onPrevClick} data-testid='prevController' />
      <span>{controllersCaption}</span>
      <NextControllerIcon onClick={onNextClick} data-testid='nextController' />
    </ControllersWrapper>
  );
};
