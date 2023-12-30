import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function PUT(request: Request): Promise<NextResponse> {
    if (request.body) {
        const body = await request.json();

        const res = await prisma.user.update({
            where: {
                email: body.email,
            },
            data: {
                username: body.username,
                pfp: body.pfp,
                firstName: body.firstName,
                lastName: body.lastName,
            },
        })

        return NextResponse.json(res);
    } else {
        return NextResponse.json({ status: "fail" });
    }
}