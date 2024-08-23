export { usePublicClient } from 'wagmi';
export type { PublicClient } from 'viem';

export * from './wallets';
export * from './constants';
export * from './types';
export * from './chains';
export * from './Web3Wrapper';
export * from './utilities/getChainId';
export * from './utilities/getUnsafeChainIdFromSearchParams';
export * from './hooks/useProvider';
export * from './hooks/useSigner';
export * from './hooks/useAccountAddress';
export * from './hooks/useSwitchChain';
export * from './hooks/useChainId';
export * from './hooks/useLogIn';
export * from './hooks/useLogOut';
export * from './hooks/useAuthModal';
export * from './hooks/useAddTokenToWallet';
