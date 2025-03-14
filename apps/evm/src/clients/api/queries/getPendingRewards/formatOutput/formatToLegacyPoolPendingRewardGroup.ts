import BigNumber from 'bignumber.js';

import type { VenusLens } from 'libs/contracts';
import type { Token } from 'types';

import type { LegacyPoolPendingRewardGroup } from '../types';
import formatRewardSummaryData from './formatRewardSummaryData';

function formatToLegacyPoolPendingRewardGroup({
  comptrollerContractAddress,
  venusLensPendingRewards,
  tokenPriceMapping,
  tokens,
}: {
  comptrollerContractAddress: string;
  tokenPriceMapping: Record<string, BigNumber>;
  tokens: Token[];
  venusLensPendingRewards: Awaited<ReturnType<VenusLens['pendingRewards']>>;
}) {
  const rewardSummaryData = formatRewardSummaryData({
    rewardSummary: {
      type: 'legacyPool',
      distributorAddress: venusLensPendingRewards.distributorAddress,
      rewardTokenAddress: venusLensPendingRewards.rewardTokenAddress,
      totalRewards: new BigNumber(venusLensPendingRewards.totalRewards.toString()),
      pendingRewards: venusLensPendingRewards.pendingRewards.map(({ amount, vTokenAddress }) => ({
        amountMantissa: new BigNumber(amount.toString()),
        vTokenAddress,
      })),
    },
    tokenPriceMapping,
    tokens,
  });

  if (!rewardSummaryData) {
    return;
  }

  const { rewardToken, rewardAmountMantissa, rewardAmountCents, vTokenAddressesWithPendingReward } =
    rewardSummaryData;

  const pendingRewardGroup: LegacyPoolPendingRewardGroup = {
    type: 'legacyPool',
    comptrollerAddress: comptrollerContractAddress,
    rewardToken,
    rewardAmountCents,
    rewardAmountMantissa,
    vTokenAddressesWithPendingReward,
  };

  return pendingRewardGroup;
}

export default formatToLegacyPoolPendingRewardGroup;
