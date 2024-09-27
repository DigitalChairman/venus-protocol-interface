import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { ChainId } from '@venusprotocol/chains';

export const useUpdateUrlChainId = () => {
  const [, setSearchParams] = useSearchParams();

  const updateUrlChainId = useCallback(
    ({ chainId }: { chainId: ChainId }) =>
      setSearchParams(currentSearchParams => ({
        ...Object.fromEntries(currentSearchParams),
        chainId: String(chainId),
      })),
    [setSearchParams],
  );

  return { updateUrlChainId };
};
