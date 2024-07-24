export async function getWalletBalance(address: string) {
  const tokenResponse = await fetch(
    `https://api.shyft.to/sol/v1/wallet/all_tokens?network=mainnet-beta&wallet=${address}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.SHYFT_API_KEY as string,
      },
    }
  );

  const tokens = await tokenResponse.json();

  return tokens.result;
}
