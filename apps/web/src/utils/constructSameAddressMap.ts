// ============================================================
// SIDRADEX V3 — src/utils/constructSameAddressMap.ts
// NEW FILE — utility used by addresses.ts
// (Uniswap's original helper — kept for compatibility)
// ============================================================

// Returns a map with the same address for each chainId provided
export function constructSameAddressMap<T extends string>(
  address: T,
  additionalNetworks: number[] = []
): { [chainId: number]: T } {
  return additionalNetworks.reduce<{ [chainId: number]: T }>(
    (acc, chainId) => {
      acc[chainId] = address
      return acc
    },
    {}
  )
}
