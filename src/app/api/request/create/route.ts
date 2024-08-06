import prisma from "@/app/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { amount, token, address, description, username } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      {
        status: 404,
      }
    );
  }

  try {
    const request = await prisma.request.create({
      data: {
        amount: parseFloat(amount),
        token,
        address,
        description,
        username,
      },
    });

    return NextResponse.json(request);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}
