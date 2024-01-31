import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: Request): Promise<NextResponse> {
  const result = await prisma.opportunity.findMany({
    include: {
      users: true,
      reviews: true,
    },
  });

  return NextResponse.json(result ? { ...result } : { status: "fail" });
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();
  if (body && "description" in body && "name" in body) {
    const result = await prisma.opportunity.create({ data: body });
    return NextResponse.json(result);
  } else if (body) {
    const opportunities = await prisma.opportunity.findMany({
      where: {
        id: {
          in: body.oppIds,
        },
      },
    });

    console.log(opportunities);
    return NextResponse.json(opportunities);
  }

  return NextResponse.json({ status: "fail" });
}
