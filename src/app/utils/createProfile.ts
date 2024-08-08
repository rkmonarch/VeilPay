import { JupToken } from "@/types";
import { useRouter } from "next/navigation";
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

  if (res.status === 400) {
    console.log("error");
    toast.error("This username is already taken, please try another one");
    return;
  }

  const data = await res.json();
  toast.success("Profile created successfully");
  return data;
}
