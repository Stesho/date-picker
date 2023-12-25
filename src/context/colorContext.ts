import { createContext } from 'react';

import { ColorOptions, Elements } from '@/types/ColorOptions';

export const ColorContext = createContext<ColorOptions>({});
