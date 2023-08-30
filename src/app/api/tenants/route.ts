import { NextResponse } from "next/server";
import { prisma } from "../../../../server/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const newTenant = await prisma.tenant.create({
    data: data,
  });

  return new NextResponse(JSON.stringify(newTenant), { status: 201 });
}
