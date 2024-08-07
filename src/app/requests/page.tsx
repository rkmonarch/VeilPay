"use client";

import RequestCard from "@/components/RequestCard";
import { useProfileStore } from "@/store";
import { Request } from "@/types";
import { useEffect, useState } from "react";
import getRequests from "../utils/getRequests";
import deleteRequest from "../utils/deleteRequest";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Loader2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VeilPay",
  description:
    "VeilPay is a secure and private payment platform that allows users to receive and make donations in various cryptocurrencies. It provides a seamless way to support causes and individuals with the coin of your choice, ensuring confidentiality and ease of use.",
  openGraph: {
    images: "https://www.veilpay.xyz/veilpay.jpg",
  },
};

export default function Requests() {
  const { profile } = useProfileStore();
  const [requests, setRequests] = useState<Request[] | null>(null);

  async function handleRequests() {
    if (!profile) return;
    const data = await getRequests(profile?.username);
    setRequests(data);
  }

  async function handleDelete(id: string) {
    if (!profile) return;
    try {
      const deleted = await deleteRequest(id);
      if (deleted) {
        toast.success("Request deleted successfully");
        handleRequests();
      }
    } catch (error) {
      toast.error("An error occurred while deleting the request");
    }
  }

  useEffect(() => {
    handleRequests();
  }, [profile]);

  if (!profile) return null;

  return (
    <section className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {requests === null ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-gray-50 rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">No requests found</h2>
            <p className="text-gray-600 mb-6">
              Create your first request to get started.
            </p>
            <Link href="/request/create" passHref>
              <Button className="flex items-center gap-2">
                <PlusCircle size={20} />
                Create Your First Request
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Active Requests</h2>
              <Link href="/request/create" passHref>
                <Button className="flex items-center gap-2">
                  <PlusCircle size={20} />
                  Create New Request
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((request) => (
                <RequestCard
                  request={request}
                  key={request.id}
                  onDelete={() => handleDelete(request.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
