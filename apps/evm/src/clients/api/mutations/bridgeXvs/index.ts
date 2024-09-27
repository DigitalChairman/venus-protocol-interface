import type BigNumber from 'bignumber.js';
import { type ContractTransaction, ethers } from 'ethers';

import type { ChainId } from '@venusprotocol/chains';
import { NULL_ADDRESS } from 'constants/address';
import { DEFAULT_ADAPTER_PARAMS, LAYER_ZERO_CHAIN_IDS } from 'constants/layerZero';
import type { XVSProxyOFTDest, XVSProxyOFTSrc } from 'libs/contracts';

export interface BridgeXvsInput {
  tokenBridgeContract: XVSProxyOFTSrc | XVSProxyOFTDest;
  accountAddress: string;
  destinationChainId: ChainId;
  amountMantissa: BigNumber;
  nativeCurrencyFeeMantissa: BigNumber;
}

export type BridgeXvsOutput = ContractTransaction;

const bridgeXvs = async ({
  tokenBridgeContract,
  accountAddress,
  destinationChainId,
  amountMantissa,
  nativeCurrencyFeeMantissa,
}: BridgeXvsInput): Promise<BridgeXvsOutput> => {
  const layerZeroDestChain = LAYER_ZERO_CHAIN_IDS[destinationChainId];
  return tokenBridgeContract.sendFrom(
    accountAddress,
    layerZeroDestChain,
    ethers.utils.hexZeroPad(accountAddress, 32),
    amountMantissa.toFixed(),
    {
      adapterParams: DEFAULT_ADAPTER_PARAMS,
      refundAddress: accountAddress,
      zroPaymentAddress: NULL_ADDRESS,
    },
    {
      value: nativeCurrencyFeeMantissa.toFixed(),
    },
  );
};

export default bridgeXvs;
