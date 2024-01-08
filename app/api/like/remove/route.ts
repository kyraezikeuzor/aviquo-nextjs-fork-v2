import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function PUT(request: Request): Promise<NextResponse> {
    if (request.body) {
        const body = await request.json();

        const res = await prisma.opportunity.update({
            where: {
                id: body.id
            },
            data: {
                users: {
                    disconnect: {id: body.userId},
                },
            }
        });

        return NextResponse.json(res);
    } else {
        return NextResponse.json({ status: "fail" });
    }
}