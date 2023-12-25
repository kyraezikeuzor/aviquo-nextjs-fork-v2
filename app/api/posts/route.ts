import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: Request): Promise<NextResponse> {
  const result = await prisma.post.findMany();

  if (result != null) {
    return NextResponse.json({ status: "success", ...result });
  }

  return NextResponse.json({ status: "fail" });
}

export async function POST(request: Request): Promise<NextResponse> {
  if (request.body) {
    const body = await request.json();
    const result = await prisma.post.create({ data: body });

    return NextResponse.json(result);
  } else {
    return NextResponse.json({ status: "fail" });
  }
}
