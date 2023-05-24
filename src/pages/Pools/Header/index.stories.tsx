import { ComponentMeta } from '@storybook/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import { withCenterStory, withRouter } from 'stories/decorators';

import { HeaderUi } from '.';

export default {
  title: 'Pages/Market/Header',
  component: HeaderUi,
  decorators: [withRouter, withCenterStory({ width: '100%' })],
  parameters: {
    backgrounds: {
      default: 'White',
    },
  },
} as ComponentMeta<typeof HeaderUi>;

export const Default = () => (
  <HeaderUi
    treasurySupplyBalanceCents={new BigNumber(912902278)}
    treasuryBorrowBalanceCents={new BigNumber(912902278)}
    treasuryLiquidityBalanceCents={new BigNumber(912902278)}
    treasuryBalanceCents={new BigNumber(912902278)}
  />
);
