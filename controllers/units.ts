import { NextApiRequest, NextApiResponse } from "next";
import UnitSchema from "../models/unit";

export async function addUnit(
  req: NextApiRequest,
  res: NextApiResponse,
  ) {
  try {
    const { number, tenantOne, tenantTwo } = req.body;
    if (number && tenantOne) {
      const unit = await UnitSchema.create({
        number,
        tenantOne,
        tenantTwo,
      });
      return res.status(200).json(unit);
    }
  } catch (error) {
    console.log(error, "Error in units controller");
    res.status(500).json({ error });
  }
}
