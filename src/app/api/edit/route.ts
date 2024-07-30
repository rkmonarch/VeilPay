import prisma from "@/app/utils/prisma-client";

export async function PUT(req: Request) {
  const { address, username, avatar, tokenAddress } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    await prisma.user.update({
      where: {
        address: address,
      },
      data: {
        username,
        avatar,
        tokenAddress,
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
