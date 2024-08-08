"use client";

import createRequest from "@/app/utils/createRequest";
import Spinner from "@/components/Spinner";
import TokenModal from "@/components/modals/TokenModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProfileStore, useRequestStore, useTokenStore } from "@/store";
import { useWallet } from "@jup-ag/wallet-adapter";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Create() {
  const { publicKey } = useWallet();
  const { selectedToken, setSelectedToken } = useTokenStore();
  const { profile } = useProfileStore();
  const { setAmount, setMessage, amount, message } = useRequestStore();
  const [isLoading, setIsLoading] = useState(false);
  const [ID, setID] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedToken) {
      setSelectedToken(profile?.token!);
    }
  }, [profile?.token, selectedToken, setSelectedToken]);

  async function handleRequest() {
    try {
      if (
        !publicKey ||
        !selectedToken ||
        !profile ||
        message.length === 0 ||
        amount.length === 0
      )
        return;
      setIsLoading(true);
      const request = await createRequest({
        address: publicKey?.toBase58(),
        amount: amount,
        description: message,
        token: selectedToken,
        username: profile?.username,
      });
      if (request.id) {
        setID(request?.id);
        toast.success("Request created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create request");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="relative bg-white overflow-hidden min-h-[calc(100vh-80px)]">
      <img
        className="absolute left-0 bottom-0"
        src="https://shuffle.dev/flaro-assets/images/sign-up/gradient.svg"
        alt=""
      />
      <div className="relative z-10 flex flex-wrap -m-8">
        <div className="w-full md:w-1/2 p-8">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="md:max-w-lg mx-auto pt-16 md:pb-32">
                  <h2 className="my-32 text-6xl md:text-7xl font-bold font-heading tracking-px-n leading-tight">
                    Create a request & get started.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <div className="p-4 py-16 flex flex-col justify-center bg-blueGray-100 h-full max-w-md">
            <form className="w-full ml-auto">
              <div className="flex flex-col space-y-1.5 mb-4">
                <Label
                  htmlFor="name"
                  className="mb-2 text-gray-900 text-md font-semibold leading-normal"
                >
                  Amount
                </Label>
                <Input
                  className="px-4 py-3.5 w-full font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                  id="signUpInput1-1"
                  type="number"
                  placeholder="Enter amount"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5 mb-4">
                <Label
                  htmlFor="name"
                  className="mb-2 text-gray-900 text-md font-semibold leading-normal"
                >
                  Select Token
                </Label>
                <TokenModal />
              </div>
              <div className="flex flex-col space-y-1.5 mb-4">
                <Label
                  htmlFor="name"
                  className="mb-2 text-gray-900 text-md font-semibold leading-normal"
                >
                  Message
                </Label>
                <Textarea
                  className="font-medium"
                  placeholder="Enter message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </div>
              {ID ? (
                <Button
                  className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                  type="button"
                  size={"lg"}
                  disabled={
                    !publicKey ||
                    !selectedToken ||
                    !profile ||
                    message.length === 0 ||
                    amount.length === 0
                  }
                  onClick={() => {
                    navigator.clipboard.writeText(ID);
                    setID(null);
                    toast.success("Link copied");
                  }}
                >
                  Copy Link
                </Button>
              ) : (
                <Button
                  className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                  type="button"
                  size={"lg"}
                  disabled={
                    !publicKey ||
                    !selectedToken ||
                    !profile ||
                    message.length === 0 ||
                    amount.length === 0
                  }
                  onClick={handleRequest}
                >
                  {isLoading ? <Spinner /> : "Create"}
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
