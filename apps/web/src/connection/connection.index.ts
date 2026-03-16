// ============================================================
// SIDRADEX V3 — src/connection/index.ts
// REPLACE your existing src/connection/index.ts with this file
// (In newer Uniswap V3 forks the folder is "connection/" not "connectors/")
// ============================================================

import { initializeConnector, Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { WalletConnect } from '@web3-react/walletconnect-v2'
import { Network } from '@web3-react/network'
import { Connector } from '@web3-react/types'
import { ChainId } from '../constants/chains'
import { RPC_URLS } from '../constants/networks'

// ─── ONLY SIDRA CHAIN ────────────────────────────────────────
const SIDRA_CHAIN_IDS = [ChainId.SIDRA]

// ─── METAMASK ────────────────────────────────────────────────
const [metamask, metamaskHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
)

// ─── WALLETCONNECT V2 ────────────────────────────────────────
const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // ← Replace with your WC project ID
        chains: SIDRA_CHAIN_IDS,
        rpcMap: RPC_URLS,
        showQrModal: true,
      },
    })
)

// ─── FALLBACK READ-ONLY NETWORK ───────────────────────────────
const [network, networkHooks] = initializeConnector<Network>(
  (actions) =>
    new Network({
      actions,
      urlMap: RPC_URLS,
      defaultChainId: ChainId.SIDRA,
    })
)

// ─── CONNECTION TYPES ────────────────────────────────────────
export enum ConnectionType {
  INJECTED = 'INJECTED',
  WALLET_CONNECT = 'WALLET_CONNECT',
  NETWORK = 'NETWORK',
}

export interface Connection {
  connector: Connector
  hooks: Web3ReactHooks
  type: ConnectionType
  name: string
  iconURL?: string
  shouldDisplay: () => boolean
}

export const METAMASK_CONNECTION: Connection = {
  connector: metamask,
  hooks: metamaskHooks,
  type: ConnectionType.INJECTED,
  name: 'MetaMask',
  iconURL: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
  shouldDisplay: () => Boolean(window.ethereum),
}

export const WALLET_CONNECT_CONNECTION: Connection = {
  connector: walletConnect,
  hooks: walletConnectHooks,
  type: ConnectionType.WALLET_CONNECT,
  name: 'WalletConnect',
  shouldDisplay: () => true,
}

export const NETWORK_CONNECTION: Connection = {
  connector: network,
  hooks: networkHooks,
  type: ConnectionType.NETWORK,
  name: 'Network',
  shouldDisplay: () => false,
}

// ─── ALL CONNECTIONS (used in Web3ReactProvider connectors=[]) ─
export const CONNECTIONS: Connection[] = [
  METAMASK_CONNECTION,
  WALLET_CONNECT_CONNECTION,
  NETWORK_CONNECTION,
]

// For Web3ReactProvider:
// connectors={CONNECTIONS.map(({ hooks, connector }) => [connector, hooks])}
export const PRIORITIZED_CONNECTORS: [Connector, Web3ReactHooks][] =
  CONNECTIONS.map(({ connector, hooks }) => [connector, hooks])
