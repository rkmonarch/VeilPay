import { JupToken } from "@/types";
import { toast } from "react-toastify";

type updateProfileParams = {
  address: string;
  username: string;
  token: JupToken;
  avatar: string;
};

export default async function updateProfile(params: updateProfileParams) {
  const res = await fetch("/api/update", {
    method: "PUT",
    body: JSON.stringify({
      address: params.address,
      username: params.username,
      avatar: params.avatar,
      token: params.token,
    }),
  });
  const data = await res.json();
  toast.success("Profile updated successfully! Now try to create a request.");
  return data;
}
