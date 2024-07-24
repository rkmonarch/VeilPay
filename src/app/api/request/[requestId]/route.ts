import { getToken } from "@/app/utils/getToken";
import prisma from "@/app/utils/prisma-client";
import { getWalletBalance } from "@/app/utils/walletbalance";
import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
} from "@solana/actions";
import {
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";

export const GET = async (
  req: Request,
  { params }: { params: { requestId: string } }
) => {
  const url = new URL(req.url);
  const requestID = params.requestId;
  const request = await prisma.request.findUnique({
    where: {
      id: requestID,
    },
  });
  if (!request) {
    return new Response(JSON.stringify({ error: "Request Not Found" }), {
      status: 404,
      headers: ACTIONS_CORS_HEADERS,
    });
  } else {
    const tokenData = await getToken(request.tokenAddress);
    const payload: ActionGetResponse = {
      icon: "https://www.veilpay.xyz/veilpay.jpg",
      description: `${request.description}`,
      title: `${request.username} has requested ${request.amount} ${tokenData.symbol} from you`,
      label: `Send ${tokenData.symbol}`,
    };

    return new Response(JSON.stringify(payload), {
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

export const OPTIONS = GET;

export async function POST(
  req: Request,
  { params }: { params: { requestId: string } }
) {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const requestID = params.requestId;
  const request = await prisma.request.findUnique({
    where: {
      id: requestID,
    },
  });

  if (!request) {
    return new Response(JSON.stringify({ error: "Request Not Found" }), {
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
  const walletbalance = await getWalletBalance(account.toBase58());
  const tokenData = await getToken(request.tokenAddress);

  const tokenBalance = walletbalance.find(
    (balance: any) => balance.address === request.tokenAddress
  );

  if (!tokenBalance) {
    return new Response(
      JSON.stringify({
        error: `You don't have any ${tokenData.symbol} in your wallet`,
      }),
      {
        status: 404,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }

  if (tokenBalance.balance < request.amount) {
    return new Response(
      JSON.stringify({
        error: `You don't have enough ${tokenData.symbol} in your wallet`,
      }),
      {
        status: 404,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
  try {
    if (
      request.tokenAddress === "11111111111111111111111111111111" ||
      request.tokenAddress === "So11111111111111111111111111111111111111112"
    ) {
      try {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: new PublicKey(account),
            toPubkey: new PublicKey(request.address),
            lamports: request.amount * LAMPORTS_PER_SOL,
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
        new PublicKey(request.tokenAddress),
        new PublicKey(account)
      );

      const receiverMintAccount = await getAssociatedTokenAddress(
        new PublicKey(request.tokenAddress),
        new PublicKey(request.address)
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
          request.amount * 10 ** tokenData.decimals
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
          message: `Thanks for supporting ${request.username}`,
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
