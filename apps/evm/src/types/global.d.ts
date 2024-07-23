import '@tanstack/react-table';
import type { WindowProvider } from 'wagmi/window';

declare module '@tanstack/react-table' {
  interface ColumnMeta<_TData extends RowData, _TValue> {
    className?: string;
  }
}

declare global {
  interface WindowEthereum extends WindowProvider {
    isInfinityWallet?: true;
    isOpera?: true;
    isBinance?: true;
  }

  interface Window {
    ethereum?: WindowEthereum;
    okxwallet?: WindowEthereum;
    BinanceChain?: {
      bnbSign?: (
        address: string,
        message: string,
      ) => Promise<{ publicKey: string; signature: string }>;
      switchNetwork?: (networkId: string) => Promise<string>;
    } & Ethereum;
  }
}

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module 'emotion-theming';
