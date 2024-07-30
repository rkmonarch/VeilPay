type createProfileParams = {
    address: string;
    username: string;
    tokenAddress: string
}

export default async function updateProfile(params: createProfileParams) {
    const res = await fetch("/api/update", {
        method: "PUT",
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
