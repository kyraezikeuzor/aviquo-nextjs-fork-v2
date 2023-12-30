import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getCurrentDateTimeString } from "@/utils";

export async function GET(request: Request): Promise<NextResponse> {
  const result = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      date: 'desc'
    }
  });

  if (result != null) {
    return NextResponse.json({ ...result });
  }

  return NextResponse.json({ status: "fail" });
}

export async function POST(request: Request): Promise<NextResponse> {
  if (request.body) {

    const body = await request.json();
    const result = await prisma.post.create({ data: {
      ...body,
      likes: 0,
    } });

    return NextResponse.json(result);
  } else {
    return NextResponse.json({ status: "fail" });
  }
}