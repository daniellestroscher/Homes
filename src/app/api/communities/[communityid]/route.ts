import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../server/lib/prisma";

export async function GET(request: NextRequest) {
  const id = request.url.split("/").pop();

  const communities = await prisma.community.findUnique({
    where: { id: id },
  });
  return NextResponse.json(communities);
}
