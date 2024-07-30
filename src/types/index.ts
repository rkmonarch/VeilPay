export interface JupToken {
    address: string
    chainId: number
    decimals: number
    name: string
    symbol: string
    logoURI: string
    extensions: Extensions
    tags: string[],
}

export interface Extensions {
    coingeckoId: string
}

export interface Profile {
    id: string
    address: string
    tokenAddress: string
    created_at: string
    username: string
    avatar: string
}
