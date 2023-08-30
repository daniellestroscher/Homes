import { prisma } from "../../../../server/lib/prisma";

import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "next/dist/server/base-server";

export async function GET(request: Request) {
  const tenancies = await prisma.tenancy.findMany();
  return NextResponse.json(tenancies);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newTenancy = await prisma.tenancy.create({
    data: data,
  });

  return new NextResponse(JSON.stringify(newTenancy), { status: 201 });
}

export async function PATCH(request: Request) {
  const data = await request.json();
  const { id } = data;
  const updatedTenancy = await prisma.tenancy.update({
    where: {
      id: id,
    },
    data: data,
  });

  return new NextResponse(JSON.stringify(updatedTenancy), { status: 201 });
}
