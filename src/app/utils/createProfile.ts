import { JupToken } from "@/types";
import { toast } from "react-toastify";

type createProfileParams = {
  address: string;
  username: string;
  token: JupToken;
  avatar: string;
};

export default async function createProfile(params: createProfileParams) {
  const res = await fetch("/api/create", {
    method: "POST",
    body: JSON.stringify({
      address: params.address,
      username: params.username,
      avatar: params.avatar,
      token: params.token,
    }),
  });
  console.log(res.status);
  if (res.status !== 200) {
    console.log("error");
    toast.error("Failed to create profile");
    return;
  }

  const data = await res.json();
  toast.success("Profile created successfully");
  return data;
}
