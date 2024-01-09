import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function PUT(request: Request): Promise<NextResponse> {
  if (request.body) {
    const body = await request.json();

    const res = await prisma.post.update({
      where: {
        id: body.postId
      },
      data: {
        upvotes: body.upvotes,
        downvotes: body.downvotes
      },
    });

    return NextResponse.json(res);
  } else {
    return NextResponse.json({ status: "fail" });
  }
}