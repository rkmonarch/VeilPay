import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTokenStore } from "@/store";
import { JupToken } from "@/types";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

function TokenModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { tokens, selectedToken, setSelectedToken } = useTokenStore();
  const [searchItem, setSearchItem] = useState("");
  const [filteredTokens, setFilteredTokens] = useState<JupToken[] | null>(
    tokens
  );

  const handleInputChange = (e: { target: { value: string } }) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    if (!tokens) return;
    const filteredItems = tokens.filter((token: JupToken) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(filteredItems);
  };

  useEffect(() => {
    if (tokens) {
      setFilteredTokens(tokens);
    }
  }, [tokens]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="flex items-center justify-between"
        >
          {selectedToken ? (
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={selectedToken.logoURI} />
                <AvatarFallback>{selectedToken.name}</AvatarFallback>
              </Avatar>
              <p className="font-semibold text-sm">{selectedToken.name}</p>
            </div>
          ) : (
            <p>Select Token</p>
          )}
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Token</DialogTitle>
          {/* <DialogDescription>
          Make changes to your profile here. Click save when
          you're done.
        </DialogDescription> */}
        </DialogHeader>
        <div>
          <Input
            className=""
            placeholder="Search tokens"
            onChange={handleInputChange}
          />
          <ScrollArea className="h-96 mt-4 flex flex-col">
            {filteredTokens &&
              filteredTokens.map((token) => (
                <div
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
                  key={token.address}
                  onClick={() => {
                    setSelectedToken(token);
                    setIsOpen(false);
                  }}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={token.logoURI} />
                    <AvatarFallback>{token.name}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">{token.name}</p>
                </div>
              ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(TokenModal);
