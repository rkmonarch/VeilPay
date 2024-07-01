import { ACTIONS_CORS_HEADERS, ActionGetResponse } from "@solana/actions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (req: Request) => {
  const url = new URL(req.url!);
  const userParams = url.searchParams.get("user");

  const errorPayload: ActionGetResponse = {
      icon: 'https://t3.ftcdn.net/jpg/01/01/89/46/360_F_101894688_RVSZUtDfPR6Cr5eBDQI7Qo5pZ01jmyK3.jpg',
      label: `Wallet or username Not Found`,
      description: `Not a valid user`,
      title: `Try again with a valid wallet address`,
  }

  console.log("User Params:", userParams);
  if (userParams) {
     
      const user = userParams;


      const payload: ActionGetResponse = {
          icon: "https://lh3.googleusercontent.com/L6zpv_9BKC6IyG1ZAUJ9WxQUDgXHpVU4y6i6F5_Qa5GC85KzFGsAPtKjRQny-BynM6-8HJMSUrF8ARd0gxs9nbJDV8gZPyKo0ATh",
          label: `send 0.1 SOL to ${user}`,
          description: `${user} has requested a payment from you.`,
          title: `send 0.1 SOL to ${user}`,
      }

      return Response.json(payload, {
          headers: ACTIONS_CORS_HEADERS
      })
  } else {
    
      return Response.json(errorPayload, {
          headers: ACTIONS_CORS_HEADERS
      })
  }
}

export const OPTIONS = GET;