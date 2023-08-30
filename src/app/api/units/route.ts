import { NextResponse } from "next/server";
import { prisma } from "../../../../server/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const newUnit = await prisma.unit.create({
    data: data,
  });

  return new NextResponse(JSON.stringify(newUnit), { status: 201 });
}
