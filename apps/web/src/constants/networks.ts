// ============================================================
// SIDRADEX V3 — src/constants/networks.ts
// NEW FILE — create at src/constants/networks.ts
// ============================================================

import { ChainId, CHAIN_INFO } from './chains'

// ─── RPC MAP ─────────────────────────────────────────────────
export const RPC_URLS: { [chainId: number]: string } = {
  [ChainId.SIDRA]: 'https://node.sidrachain.com',
}

// ─── MULTICALL3 ADDRESS ──────────────────────────────────────
// If you deployed Multicall3, add it here.
// Otherwise leave empty and the app will fallback to single calls.
export const MULTICALL_ADDRESSES: { [chainId: number]: string } = {
  [ChainId.SIDRA]: '', // ← Add your Multicall3 address here if deployed
}

// ─── SWITCH TO SIDRA CHAIN ────────────────────────────────────
// Call this when wallet is on wrong chain
export async function switchToSidraChain(): Promise<void> {
  if (!window.ethereum) throw new Error('No wallet detected')

  const chainHex = `0x${ChainId.SIDRA.toString(16)}` // "0x17C8D"

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainHex }],
    })
  } catch (err: any) {
    // Error 4902 = chain not added yet → add it first
    if (err.code === 4902) {
      const info = CHAIN_INFO[ChainId.SIDRA]
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: chainHex,
            chainName: info.chainName,
            nativeCurrency: info.nativeCurrency,
            rpcUrls: info.rpcUrls,
            blockExplorerUrls: info.blockExplorerUrls,
          },
        ],
      })
    } else {
      throw err
    }
  }
}

// ─── CHAIN GUARD ─────────────────────────────────────────────
export function isSidraChain(chainId: number | undefined): boolean {
  return chainId === ChainId.SIDRA
}
