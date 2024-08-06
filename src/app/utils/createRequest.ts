import { JupToken } from "@/types";

type createRequestParams = {
  amount: string;
  token: JupToken;
  address: string;
  description: string;
  username: string;
};

export default async function createRequest(params: createRequestParams) {
  const res = await fetch("/api/request/create", {
    method: "POST",
    body: JSON.stringify({
      amount: params.amount,
      token: params.token,
      address: params.address,
      description: params.description,
      username: params.username,
    }),
  });
  const data = await res.json();
  return data;
}
