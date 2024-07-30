type createRequestParams = {
    amount: string,
    tokenAddress: string,
    address: string,
    description: string,
    username: string
}

export default async function createRequest(params: createRequestParams) {
    const res = await fetch("/api/request/create", {
        method: "POST",
        body: JSON.stringify({
            amount: params.amount,
            tokenAddress: params.tokenAddress,
            address: params.address,
            description: params.description,
            username: params.username
        })
    })
    const data = await res.json()
    return data
}
