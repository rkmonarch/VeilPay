import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Request } from "@/types";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { Trash2, Link } from "lucide-react";

export default function RequestCard({
  request,
  onDelete,
}: {
  request: Request;
  onDelete: (id: string) => void;
}) {
  const copyLinkToClipboard = async () => {
    await navigator.clipboard.writeText(
      `https://veilpay.xyz/request/${request?.id}`
    );
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-[350px] p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarImage
              src={request?.token.logoURI}
              alt={request?.token?.name}
            />
            <AvatarFallback>{request?.token?.symbol}</AvatarFallback>
          </Avatar>
          <div>
            <h6 className="text-base font-semibold">{request?.token?.name}</h6>
            <p className="text-sm text-gray-500">{request?.token?.symbol}</p>
          </div>
        </div>
        <p className="text-xl font-bold">{request?.amount}</p>
      </div>
      <p className="text-sm text-gray-600">{request?.description}</p>
      <div className="flex gap-2 mt-2">
        <Button
          onClick={copyLinkToClipboard}
          size="sm"
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Link size={16} />
          Copy Blink Link
        </Button>
        <Button
          onClick={() => onDelete(request.id)}
          size="sm"
          variant="destructive"
          className="flex items-center justify-center"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}
