// ============================================================
// SIDRADEX V3 — src/constants/tokens.ts
// REPLACE your existing src/constants/tokens.ts with this file
// ============================================================

import { Token, NativeCurrency, Currency } from '@uniswap/sdk-core'
import { ChainId } from './chains'

// ─── WSDA (Wrapped SDA) ──────────────────────────────────────
// This is the WETH9 equivalent on Sidra Chain
// Used as the base token in all V3 pools
export const WSDA: { [chainId: number]: Token } = {
  [ChainId.SIDRA]: new Token(
    ChainId.SIDRA,
    '0xe4095a910209d7be03b55d02f40d4554b1666182',
    18,
    'WSDA',
    'Wrapped Sidra'
  ),
}

// ─── VPD TOKEN ────────────────────────────────────────────────
export const VPD: { [chainId: number]: Token } = {
  [ChainId.SIDRA]: new Token(
    ChainId.SIDRA,
    '0x345b20d4fca08376f19145c36c531a1821af96c4',
    18,
    'VPD',
    'VPD Token'
  ),
}

// ─── MBF TOKEN ────────────────────────────────────────────────
export const MBF: { [chainId: number]: Token } = {
  [ChainId.SIDRA]: new Token(
    ChainId.SIDRA,
    '0xf74106911432657a24b0d85257d40f24f801cc01',
    18,
    'MBF',
    'MBF Token'
  ),
}

// ─── ECSDA TOKEN ──────────────────────────────────────────────
export const ECSDA: { [chainId: number]: Token } = {
  [ChainId.SIDRA]: new Token(
    ChainId.SIDRA,
    '0xb6f440a059d24ca305bce6f25115d09e9dbea653',
    18,
    'ECSDA',
    'ECSDA Token'
  ),
}

// ─── NATIVE SDA CURRENCY ─────────────────────────────────────
// Represents native SDA (unwrapped) — displayed as "SDA" in UI
export class SDA extends NativeCurrency {
  private static _instance: SDA

  private constructor() {
    super(ChainId.SIDRA, 18, 'SDA', 'Sidra Digital Assets')
  }

  static getInstance(): SDA {
    if (!this._instance) {
      this._instance = new SDA()
    }
    return this._instance
  }

  get wrapped(): Token {
    return WSDA[ChainId.SIDRA]
  }

  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}

// ─── NATIVE CURRENCY MAP ─────────────────────────────────────
export const NATIVE_CURRENCY: { [chainId: number]: NativeCurrency } = {
  [ChainId.SIDRA]: SDA.getInstance(),
}

// ─── ALL TOKENS MAP ───────────────────────────────────────────
// Used by token lists, selectors, and routing
export const ALL_TOKENS: { [chainId: number]: { [address: string]: Token } } = {
  [ChainId.SIDRA]: {
    [WSDA[ChainId.SIDRA].address.toLowerCase()]:  WSDA[ChainId.SIDRA],
    [VPD[ChainId.SIDRA].address.toLowerCase()]:   VPD[ChainId.SIDRA],
    [MBF[ChainId.SIDRA].address.toLowerCase()]:   MBF[ChainId.SIDRA],
    [ECSDA[ChainId.SIDRA].address.toLowerCase()]: ECSDA[ChainId.SIDRA],
  },
}

// ─── TOKEN LOGO URLS ──────────────────────────────────────────
export const TOKEN_LOGO_URLS: { [address: string]: string } = {
  '0xe4095a910209d7be03b55d02f40d4554b1666182': 'https://www.sidrachain.com/logo.png', // WSDA
  '0x345b20d4fca08376f19145c36c531a1821af96c4': '', // VPD — add your logo URL here
  '0xf74106911432657a24b0d85257d40f24f801cc01': '', // MBF — add your logo URL here
  '0xb6f440a059d24ca305bce6f25115d09e9dbea653': '', // ECSDA — add your logo URL here
}

// ─── DEFAULT SWAP TOKENS ─────────────────────────────────────
// What appears pre-selected in the swap UI on load
export const DEFAULT_INPUT_CURRENCY  = 'SDA'   // native SDA
export const DEFAULT_OUTPUT_CURRENCY = WSDA[ChainId.SIDRA].address
