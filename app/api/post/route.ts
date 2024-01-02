import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getCurrentDateTimeString } from "@/utils";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const result = await prisma.post.findUnique({
      where: { id: id },
      include: {
        comments: true,
        author: true,
      },
    });
    if (result != null) {
      return NextResponse.json({ ...result });
    }
  }

  return NextResponse.json({ status: "fail" });
}
