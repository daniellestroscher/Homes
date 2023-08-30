import { NextResponse } from "next/server";
import { prisma } from "../../../../../server/lib/prisma";

export async function GET(request: Request) {
  const id = request.url.split("/").pop();
  const units = await prisma.unit.findUnique({
    where: { id: id },
    include: {
      tenancies: {
        include: {
          tenancyVersions: true,
          tenants: true,
        },
      },
    },
  });
  return NextResponse.json(units);
}
