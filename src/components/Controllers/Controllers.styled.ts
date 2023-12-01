import styled from 'styled-components';

import { ReactComponent as NextIcon } from '@/assets/icons/Next.svg';
import { ReactComponent as PrevIcon } from '@/assets/icons/Prev.svg';

export const ControllersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  font-weight: 700;
`;

export const PrevControllerIcon = styled(PrevIcon)`
  cursor: pointer;
`;
export const NextControllerIcon = styled(NextIcon)`
  cursor: pointer;
`;
