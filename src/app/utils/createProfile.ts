type createProfileParams = {
    address: string;
    username: string;
    tokenAddress: string
}

export default async function createProfile(params: createProfileParams) {
    const res = await fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({
            address: params.address,
            username: params.username,
            avatar: `https://source.boringavatars.com/beam/120/${params.username}`,
            tokenAddress: params.tokenAddress,
        }),
    });
    const data = await res.json();
    return data
}
