export async function getToken(tokenAddress: string) {
  const response = await fetch(
    `https://api.shyft.to/sol/v1/token/get_info?network=mainnet-beta&token_address=${tokenAddress}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SHYFT_API_KEY as string,
      },
    }
  );

  const tokenPrice = await getTokenPrice(tokenAddress);

  console.log("tokenPrice", tokenPrice);
  const token = await response.json();

  let tokenInfo = {
    name: token.result.name,
    symbol: token.result.symbol,
    image: token.result.image,
    decimals: token.result.decimals,
    address: token.result.address,
    price: tokenPrice,
  };

  return tokenInfo;
}

async function getTokenPrice(address: string) {
  try {
    const res = await fetch(
      `https://public-api.birdeye.so/defi/price?address=${address}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.NEXT_PUBLIC_BIRDEYE_API_KEY as string,
        },
      }
    );
    const data = await res.json();
    return data.data.value;
  } catch (error) {
    console.error("Error fetching token price:", error);
  }
}
