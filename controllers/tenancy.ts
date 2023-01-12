import { NextApiRequest, NextApiResponse } from "next";
import { sequelize } from "../database/connection";
import TenancySchema from "../models/tenancy";

export async function createTenancy(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { unitId, tenantOne, tenantTwo, rent, notes, assignmentOfLease, pet, documents } = req.body;
    if (tenantOne) {
      const tenancy = await TenancySchema.create({
        unitId,
        tenantOne,
        tenantTwo,
        rent,
        notes,
        assignmentOfLease,
        pet,
        documents,
      });
      return res.status(200).json(tenancy);
    }

  } catch (error) {
    console.log(error, "Error in tenancy controller CREATE");
    res.status(500).json({ error });
  }
}