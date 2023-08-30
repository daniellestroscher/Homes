import { prisma } from "../../../../../server/lib/prisma";

import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "next/dist/server/base-server";

export async function GET(request: Request) {
  console.log('here')
  const tenancyVersions = await prisma.tenancy_Versions.findMany();
  return NextResponse.json(tenancyVersions);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newTenancyVersion = await prisma.tenancy_Versions.create({
    data: data,
  });

  return new NextResponse(JSON.stringify(newTenancyVersion), { status: 201 });
}
