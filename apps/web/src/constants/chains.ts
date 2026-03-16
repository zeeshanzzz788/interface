// ============================================================
// SIDRADEX V3 — src/constants/chains.ts
// REPLACE your existing src/constants/chains.ts with this file
// ============================================================

export enum ChainId {
  SIDRA = 97453,
}

// Human-readable name for each chain
export const CHAIN_NAMES_TO_IDS: { [name: string]: ChainId } = {
  sidra: ChainId.SIDRA,
  sidrachain: ChainId.SIDRA,
}

export const CHAIN_IDS_TO_NAMES: { [chainId: number]: string } = {
  [ChainId.SIDRA]: 'sidra',
}

// Only Sidra Chain is supported — all other chains removed
export const ALL_SUPPORTED_CHAIN_IDS: ChainId[] = [ChainId.SIDRA]

export const DEFAULT_CHAIN_ID = ChainId.SIDRA

// ─── CHAIN INFO ───────────────────────────────────────────────
// Used by Header network selector, AddEthereumChain, etc.
export interface ChainInfo {
  readonly chainId: number
  readonly chainName: string
  readonly nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  readonly rpcUrls: string[]
  readonly blockExplorerUrls: string[]
  readonly label: string
  readonly logoUrl?: string
  readonly isTestnet?: boolean
}

export const CHAIN_INFO: { [chainId in ChainId]: ChainInfo } = {
  [ChainId.SIDRA]: {
    chainId: 97453,
    chainName: 'Sidra Chain',
    label: 'Sidra Chain',
    nativeCurrency: {
      name: 'Sidra Digital Assets',
      symbol: 'SDA',
      decimals: 18,
    },
    rpcUrls: ['https://node.sidrachain.com'],
    blockExplorerUrls: ['https://ledger.sidrachain.com'],
    logoUrl: 'https://www.sidrachain.com/logo.png',
  },
}

// MetaMask wallet_addEthereumChain params
export const ADD_CHAIN_PARAMETERS: { [chainId: number]: ChainInfo } = {
  [ChainId.SIDRA]: CHAIN_INFO[ChainId.SIDRA],
}
