import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getCurrentDateTimeString } from "@/utils";

export async function GET(request: Request): Promise<NextResponse> {
const { searchParams } = new URL(request.url);
const id = searchParams.get('id');

  const result = await prisma.comment.findMany({
    where: {
        postId: id!,
    },
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
    const result = await prisma.comment.create({ data: {
      ...body,
    } });

    return NextResponse.json(result);
  } else {
    return NextResponse.json({ status: "fail" });
  }
}