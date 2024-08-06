import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Request } from "@/types";
import { Button } from "./ui/button";

export default function RequestCard({ request }: { request: Request }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-[350px] p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src={request?.token.logoURI} />
            <AvatarFallback>{request?.token?.name}</AvatarFallback>
          </Avatar>
          <div>
            <h6 className="text-sm font-semibold">{request?.token?.name}</h6>
            <p className="text-xs font-medium">{request?.token?.symbol}</p>
          </div>
        </div>
        <p className="text-lg font-semibold">{request?.amount}</p>
      </div>
      <p className="text-sm font-medium">{request?.description}</p>
      <Button size={"sm"}>Copy Blink Link</Button>
    </div>
  );
}
