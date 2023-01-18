import { NextApiRequest, NextApiResponse } from "next";
import { sequelize } from "../database/connection";
import TenancySchema from "../models/tenancy";
import TenantSchema from "../models/tenant";

export async function createTenancy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      unitId,
      rent,
      notes,
      assignmentOfLease,
      pet,
      documents,
    } = req.body;
    if (rent) {
      const tenancy = await TenancySchema.create({
        unitId,
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

export async function getAllTenancies(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tenancy = await TenancySchema.findAll({
      include: [
        TenantSchema,
      ],
    });
    return res.status(200).json(tenancy);

  } catch (error) {
    console.log(error, "Error in tenancy controller GETALL");
    res.status(500).json({ error });
  }
}

export async function getTenancyById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { unitId } = req.query;
    if (unitId) {
      const tenancy = await TenancySchema.findOne({
        where: { unitId: unitId },
        include: [
          TenantSchema,
          // {
          //   association: "tenants",
          //   attributes: ["firstName", "lastName"],
          // },
        ],
      });
      return res.status(200).json(tenancy);
    }
  } catch (error) {
    console.log(error, "Error in tenancy controller GETBYID");
    res.status(500).json({ error });
  }
}
