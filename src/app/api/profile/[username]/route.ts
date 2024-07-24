import { getToken } from "@/app/utils/getToken";
import prisma from "@/app/utils/prisma-client";
import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
} from "@solana/actions";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export const GET = async (
  req: Request,
  { params }: { params: { username: string } }
) => {
  const url = new URL(req.url);
  const username = params.username;
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: ACTIONS_CORS_HEADERS,
    });
  } else {
    const tokenData = await getToken(user.tokenAddress);
    const tokenPrice = tokenData.price;

    const calculateTokenAmount = (usdAmount: number) =>
      Math.round(usdAmount / tokenPrice);

    const payload: ActionGetResponse = {
      icon: "https://www.veilpay.xyz/veilpay.jpg",
      description: `Support ${user.username} with a ${tokenData.symbol} Coin Donation!
Join the cause and show your support by sending ${tokenData.symbol} coins to ${user.username}. Every coin counts and helps ${user.username} continue their journey.`,
      title: `Support ${user.username} with ${tokenData.symbol} Coins`,
      label: `Send ${tokenData.symbol}`,
      links: {
        actions: [
          {
            label: `send ${calculateTokenAmount(10)} ${tokenData.symbol}`,
            href: `${url.origin}${url.pathname}?amount=${calculateTokenAmount(
              10
            )}`,
          },
          {
            label: `send ${calculateTokenAmount(50)} ${tokenData.symbol}`,
            href: `${url.origin}${url.pathname}?amount=${calculateTokenAmount(
              50
            )}`,
          },
          {
            label: `send ${calculateTokenAmount(100)} ${tokenData.symbol}`,
            href: `${url.origin}${url.pathname}?amount=${calculateTokenAmount(
              100
            )}`,
          },
          {
            href: `${url.origin}${url.pathname}?amount={amount}`,
            label: `send ${tokenData.symbol}`,
            parameters: [
              {
                name: "amount",
                label: "Enter a custom amount",
              },
            ],
          },
        ],
      },
    };

    return new Response(JSON.stringify(payload), {
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

export const OPTIONS = GET;

export async function POST(
  req: Request,
  { params }: { params: { username: string } }
) {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const url = new URL(req.url);
  const amount = Number(url.searchParams.get("amount")) || 0;
  const username = params.username;
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
  const body: ActionPostRequest = await req.json();

  let account: PublicKey;

  try {
    account = new PublicKey(body.account);
  } catch (err) {
    return new Response("invalid account provided", {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
  const tokenData = await getToken(user.tokenAddress);

  try {
    if (
      user.tokenAddress === "11111111111111111111111111111111" ||
      user.tokenAddress === "So11111111111111111111111111111111111111112"
    ) {
      try {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: new PublicKey(account),
            toPubkey: new PublicKey(user.address),
            lamports: amount * LAMPORTS_PER_SOL,
          })
        );
        transaction.feePayer = new PublicKey(account);
        transaction.recentBlockhash = (
          await connection.getLatestBlockhash()
        ).blockhash;
        transaction!.lastValidBlockHeight = (
          await connection.getLatestBlockhash()
        ).lastValidBlockHeight;
        const payload: ActionPostResponse = await createPostResponse({
          fields: {
            transaction,
            message: "Chad devs supports each other",
          },
        });
        return new Response(JSON.stringify(payload), {
          headers: ACTIONS_CORS_HEADERS,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        return new Response(
          JSON.stringify({ error: "Internal Server Error" }),
          {
            status: 500,
            headers: ACTIONS_CORS_HEADERS,
          }
        );
      }
    } else {
      const senderMintAccount = await getAssociatedTokenAddress(
        new PublicKey(user.tokenAddress),
        new PublicKey(account)
      );

      const receiverMintAccount = await getAssociatedTokenAddress(
        new PublicKey(user.tokenAddress),
        new PublicKey(user.address)
      );

      if (!senderMintAccount || !receiverMintAccount) {
        return new Response(
          JSON.stringify({
            error: `Error fetching associated token account, make sure you have ${tokenData.symbol} in your wallet`,
          }),
          {
            status: 404,
            headers: ACTIONS_CORS_HEADERS,
          }
        );
      }

      const transaction = new Transaction().add(
        createTransferInstruction(
          new PublicKey(senderMintAccount),
          new PublicKey(receiverMintAccount),
          account,
          amount * 10 ** tokenData.decimals
        )
      );

      transaction.feePayer = new PublicKey(account);
      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;
      transaction!.lastValidBlockHeight = (
        await connection.getLatestBlockhash()
      ).lastValidBlockHeight;

      const payload: ActionPostResponse = await createPostResponse({
        fields: {
          transaction: transaction,
          message: `Thanks for support ${user.username}`,
        },
      });

      return new Response(JSON.stringify(payload), {
        headers: ACTIONS_CORS_HEADERS,
      });
    }
  } catch (error) {
    console.error("Error fetching tx:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
}
