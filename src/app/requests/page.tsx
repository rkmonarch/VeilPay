"use client";

import RequestCard from "@/components/RequestCard";
import { useProfileStore } from "@/store";
import { Request } from "@/types";
import { useEffect, useState } from "react";
import getRequests from "../utils/getRequests";

export default function Requests() {
  const { profile } = useProfileStore();
  const [requests, setRequests] = useState<Request[] | null>(null);

  async function handleRequests() {
    if (!profile) return;
    const data = await getRequests(profile?.username);
    if (data.length > 0) {
      setRequests(data);
    }
  }

  useEffect(() => {
    handleRequests();
  }, [profile]);

  if (!profile || !requests) return;

  return (
    <section className="container mx-auto flex items-center flex-wrap">
      {requests && requests.length > 0 && (
        <div className="flex flex-wrap items-center gap-8">
          {requests.map((request) => (
            <RequestCard request={request} />
          ))}
        </div>
      )}
    </section>
  );
}
