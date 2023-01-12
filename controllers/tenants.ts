import { NextApiRequest, NextApiResponse } from "next";
import { sequelize } from "../database/connection";

import TenantSchema from "../models/tenant";

export async function createTenant(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { firstName, lastName } = req.body;
    if (firstName) {
      const tenant = await TenantSchema.create({
        firstName,
        lastName,
      });
      return res.status(200).json(tenant);
    }
  } catch (error) {
    console.log(error, "Error in tenants controller CREATE");
    res.status(500).json({ error });
  }
}