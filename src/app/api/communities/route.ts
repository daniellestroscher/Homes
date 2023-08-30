import { prisma } from "../../../../server/lib/prisma";

import {
  createCommunity,
  getAllCommunities,
} from "../../../../server/sequelize/controllers/communities";
import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "next/dist/server/base-server";

// const router = createEdgeRouter();

// router.get(getAllCommunities as any);
// router.post(createCommunity as any);

// // default router.handler();
// export async function GET(request: NextRequest, ctx: RequestContext) {
//   return router.run(request, ctx);
// }

// export async function POST(request: NextRequest, ctx: RequestContext) {
//   return router.run(request, ctx);
// }

export async function GET(request: Request) {
  const communities = await prisma.community.findMany();
  return NextResponse.json(communities);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newCommunity = await prisma.community.create({
    data: data,
  });

  return new NextResponse(JSON.stringify(newCommunity), { status: 201 });
}
