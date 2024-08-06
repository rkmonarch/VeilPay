import prisma from "@/app/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username } = await req.json();
  const requests = await prisma.request.findMany({
    where: {
      username: username,
    },
  });
  if (!requests) {
    return NextResponse.json(
      { message: "No requests found" },
      {
        status: 400,
      }
    );
  }
  return NextResponse.json(requests);
}
