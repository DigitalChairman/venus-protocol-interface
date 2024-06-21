import BigNumber from 'bignumber.js';
import { NULL_ADDRESS } from 'constants/address';
import type { Token } from 'types';
import { convertMantissaToTokens } from 'utilities';
import type { ApiMarketData } from '.';

interface FormatToMarketInput {
  apiMarket: ApiMarketData;
  xvs: Token;
}

const formatToMarket = ({ apiMarket, xvs }: FormatToMarketInput) => {
  const totalXvsDistributedTokens = apiMarket.totalDistributedMantissa
    ? convertMantissaToTokens({
        value: new BigNumber(apiMarket.totalDistributedMantissa),
        token: xvs,
      })
    : new BigNumber(0);

  return {
    address: apiMarket.address,
    borrowerCount: apiMarket.borrowerCount,
    supplierCount: apiMarket.supplierCount,
    supplyApyPercentage: new BigNumber(apiMarket.supplyApy),
    borrowApyPercentage: new BigNumber(apiMarket.borrowApy),
    borrowRatePerBlock: new BigNumber(apiMarket.borrowRatePerBlock),
    supplyRatePerBlock: new BigNumber(apiMarket.supplyRatePerBlock),
    exchangeRateMantissa: new BigNumber(apiMarket.exchangeRateMantissa),
    underlyingAddress: apiMarket.underlyingAddress ?? NULL_ADDRESS,
    underlyingTokenPriceMantissa: new BigNumber(apiMarket.underlyingPriceMantissa),
    supplyCapsMantissa: new BigNumber(apiMarket.supplyCapsMantissa),
    borrowCapsMantissa: new BigNumber(apiMarket.borrowCapsMantissa),
    cashMantissa: new BigNumber(apiMarket.cashMantissa),
    reserveFactorMantissa: new BigNumber(apiMarket.reserveFactorMantissa),
    collateralFactorMantissa: new BigNumber(apiMarket.collateralFactorMantissa),
    totalReservesMantissa: new BigNumber(apiMarket.totalReservesMantissa),
    totalBorrowsMantissa: new BigNumber(apiMarket.totalBorrowsMantissa),
    totalSupplyMantissa: new BigNumber(apiMarket.totalSupplyMantissa),
    totalXvsDistributedTokens,
    estimatedPrimeBorrowApyBoost: apiMarket.estimatedPrimeBorrowApyBoost
      ? new BigNumber(apiMarket.estimatedPrimeBorrowApyBoost)
      : undefined,
    estimatedPrimeSupplyApyBoost: apiMarket.estimatedPrimeSupplyApyBoost
      ? new BigNumber(apiMarket.estimatedPrimeSupplyApyBoost)
      : undefined,
    pausedActionsBitmap: apiMarket.pausedActionsBitmap,
    isListed: apiMarket.isListed,
    rewardsDistributors: apiMarket.rewardsDistributors.map(rd => ({
      marketAddress: rd.marketAddress,
      rewardTokenAddress: rd.rewardTokenAddress,
      lastRewardingSupplyBlockOrTimestamp: new BigNumber(rd.lastRewardingSupplyBlockOrTimestamp),
      lastRewardingBorrowBlockOrTimestamp: new BigNumber(rd.lastRewardingBorrowBlockOrTimestamp),
      supplySpeed: new BigNumber(rd.supplySpeed),
      borrowSpeed: new BigNumber(rd.borrowSpeed),
      priceMantissa: new BigNumber(rd.priceMantissa),
      rewardsDistributorContractAddress: rd.rewardsDistributorContractAddress || '',
    })),
  };
};

export default formatToMarket;
