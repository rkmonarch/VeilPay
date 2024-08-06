import prisma from "@/app/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const request = await prisma.request.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      {
        message: "Request deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Request not found" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      { message: "An error occurred while deleting the request" },
      {
        status: 500,
      }
    );
  }
}
