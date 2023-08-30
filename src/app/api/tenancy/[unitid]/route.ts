import { Puritan } from "next/font/google";
import { prisma } from "../../../../../server/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  const tenancies = await prisma.tenancy.findMany();
  return NextResponse.json(tenancies);
}

// export async function PUT(request: Request) {
//   const data = await request.json();
//   const { id } = data;
//   console.log(data, "IN HERE")

//   const tenancyWithUpdatedNotes = await prisma.tenancy.update({
//     where: { id: id },
//     data: {
//       id: id,
//       unitId: undefined,
//       establishedDate: undefined,
//       notes: data,
//       assignmentOfLease: undefined,
//       pet: undefined,
//       documents: undefined,
//       activeStatus: undefined,
//       previousTenancy: undefined,
//     },
//   });

//   return new NextResponse(JSON.stringify(tenancyWithUpdatedNotes), { status: 201 });
// }

export async function PATCH(request: Request) {
  const data = await request.json();
  console.log(data, "THIS IS THE DATA ONJ");

  const {id, unitId, establishedDate, notes, assignmentOfLease, pet, documents, activeStatus, previousTenancy } = data.tenancy;
  const newTenancy = await prisma.tenancy.update({
    where: { id: data.tenancy.id },
    data: {
      id: id || undefined,
      unitId: unitId || undefined,
      establishedDate: establishedDate || undefined,
      notes: notes || undefined,
      assignmentOfLease: assignmentOfLease || undefined,
      pet: pet || undefined,
      documents: documents || undefined,
      activeStatus: activeStatus || undefined,
      previousTenancy: previousTenancy || undefined,
    }
  });
  if (data.tenantOne) {
    const newTenantOne = await prisma.tenant.update({
      where: { id: data.tenantOne.id },
      data: data.tenantOne,
    });
    const newTenancyTwo = await prisma.tenant.update({
      where: { id: data.tenantTwo.id },
      data: data.tenantTwo,
    });
  }

  return new NextResponse(JSON.stringify(newTenancy), { status: 201 });
}
