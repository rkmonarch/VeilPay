import prisma from "@/app/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { address, username, avatar, token } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (user) {
    return NextResponse.json(
      { message: "User with this username already exists" },
      {
        status: 400,
      }
    );
  }
  const data = await prisma.user.create({
    data: {
      address: address,
      username: username,
      avatar: avatar,
      token: token,
    },
  });
  return NextResponse.json(data);
}
