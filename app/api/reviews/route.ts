import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { getCurrentDateTimeString } from "@/utils";

export async function GET(request: Request): Promise<NextResponse> {
  const result = await prisma.review.findMany({
    // include: {
    //   author: true,
    // },
    // orderBy: {
    //   star: "desc",
    // },
  });

  if (result != null) {
    return NextResponse.json({ ...result });
  }

  return NextResponse.json({ status: "fail" });
}

export async function POST(request: Request): Promise<NextResponse> {
  if (request.body) {
    const body = await request.json();
    const result = await prisma.post.create({
      data: {
        ...body,
        verified: false,
      },
    });

    return NextResponse.json(result);
  } else {
    return NextResponse.json({ status: "fail" });
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  if (request.body) {
      const body = await request.json();

      const res = await prisma.review.update({
          where: {
              id: body.id
          },
          data: {
              verified: body.isVerified,
          }
      });

      return NextResponse.json(res);
  } else {
      return NextResponse.json({ status: "fail" });
  }
}
