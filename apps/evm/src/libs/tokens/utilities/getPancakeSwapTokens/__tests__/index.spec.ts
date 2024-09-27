import { ChainId } from '@venusprotocol/chains';
import { pancakeSwapTokens } from 'libs/tokens/infos/pancakeSwapTokens';

import { getPancakeSwapTokens } from '..';

describe('getPancakeSwapTokens', () => {
  it('returns all the tokens relevant to the passed chain ID', () => {
    const result = getPancakeSwapTokens({
      chainId: ChainId.BSC_TESTNET,
    });

    expect(result).toBe(pancakeSwapTokens[ChainId.BSC_TESTNET]);
  });
});
