import { type QueryObserverOptions, useQuery } from '@tanstack/react-query';

import type { ChainId } from '@venusprotocol/chains';
import getVTokens, { type GetVTokensOutput } from 'clients/api/queries/getVTokens';
import FunctionKey from 'constants/functionKey';
import {
  useGetLegacyPoolComptrollerContract,
  useGetPoolLensContract,
  useGetPoolRegistryContractAddress,
  useGetVenusLensContract,
} from 'libs/contracts';
import { useGetTokens } from 'libs/tokens';
import { useChainId } from 'libs/wallet';
import { callOrThrow } from 'utilities';

export type UseGetVTokensQueryKey = [
  FunctionKey.GET_VTOKENS,
  {
    chainId: ChainId;
  },
];

type Options = QueryObserverOptions<
  GetVTokensOutput,
  Error,
  GetVTokensOutput,
  GetVTokensOutput,
  UseGetVTokensQueryKey
>;

const useGetVTokens = (options?: Partial<Options>) => {
  const { chainId } = useChainId();
  const tokens = useGetTokens();

  const venusLensContract = useGetVenusLensContract();
  const legacyPoolComptrollerContract = useGetLegacyPoolComptrollerContract();
  const poolLensContract = useGetPoolLensContract();
  const poolRegistryContractAddress = useGetPoolRegistryContractAddress();

  return useQuery({
    queryKey: [
      FunctionKey.GET_VTOKENS,
      {
        chainId,
      },
    ],

    queryFn: () =>
      callOrThrow({ poolLensContract, poolRegistryContractAddress }, params =>
        getVTokens({
          legacyPoolComptrollerContract,
          venusLensContract,
          tokens,
          ...params,
        }),
      ),

    ...options,
  });
};

export default useGetVTokens;
