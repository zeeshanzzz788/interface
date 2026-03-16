// ============================================================
// SIDRADEX V3 — src/constants/addresses.ts
// REPLACE your existing src/constants/addresses.ts with this file
// ============================================================
// All V3 contract addresses for Sidra Chain (97453)
// Extracted directly from your provided addresses
// ─────────────────────────────────────────────────────────────

import { ChainId } from './chains'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'

// ─── HELPER TYPE ─────────────────────────────────────────────
type AddressMap = { [chainId: number]: string }

// ─── V3 SWAP ROUTER ──────────────────────────────────────────
// SwapRouter02 — used for all swaps
export const V3_ROUTER_ADDRESSES: AddressMap = {
  [ChainId.SIDRA]: '0x35cAC72Db00e8dAC0e4f7F8A0F53D339E0cC23fb',
}

// ─── V3 QUOTER ───────────────────────────────────────────────
// QuoterV2 — used for price quotes and swap simulation
export const V3_QUOTER_ADDRESSES: AddressMap = {
  [ChainId.SIDRA]: '0xe24929ec26cc2faD91655B3AD3C597Fd477A80F9',
}

// ─── V3 FACTORY ──────────────────────────────────────────────
// UniswapV3Factory — used for pool creation and lookup
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  [ChainId.SIDRA]: '0xCFE41fb5dA87916D84E7F2289087b4Ff7163cDE',
}

// ─── NONFUNGIBLE POSITION MANAGER ────────────────────────────
// NonfungiblePositionManager — used for liquidity positions (NFT LP)
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = {
  [ChainId.SIDRA]: '0x8b9bCc8C722778f30146e20e44E8d8e28adD8df8',
}

// ─── WETH9 / WSDA ────────────────────────────────────────────
// Wrapped SDA — used as WETH equivalent in all V3 pairs
export const WETH9_ADDRESSES: AddressMap = {
  [ChainId.SIDRA]: '0xe4095a910209d7be03b55d02f40d4554b1666182',
}

// ─── CONVENIENCE GETTER ───────────────────────────────────────
// Safe lookup with error — import this instead of indexing directly
export function getAddress(map: AddressMap, chainId: ChainId): string {
  const address = map[chainId]
  if (!address) {
    throw new Error(
      `[SidraDEX] No address found for chainId ${chainId}. Only Sidra Chain (97453) is supported.`
    )
  }
  return address
}

// ─── EXPORTS FOR EASY IMPORT ─────────────────────────────────
// Use these named exports in components/hooks instead of indexing maps
export const ROUTER_ADDRESS   = (chainId: ChainId) => getAddress(V3_ROUTER_ADDRESSES, chainId)
export const QUOTER_ADDRESS   = (chainId: ChainId) => getAddress(V3_QUOTER_ADDRESSES, chainId)
export const FACTORY_ADDRESS  = (chainId: ChainId) => getAddress(V3_CORE_FACTORY_ADDRESSES, chainId)
export const POSITION_MANAGER = (chainId: ChainId) => getAddress(NONFUNGIBLE_POSITION_MANAGER_ADDRESSES, chainId)
export const WSDA_ADDRESS     = (chainId: ChainId) => getAddress(WETH9_ADDRESSES, chainId)
