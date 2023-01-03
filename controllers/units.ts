import { NextApiRequest, NextApiResponse } from "next";
import UnitModel from "../models/unit";
import { IUnit } from "../types/interfaces";

// db.sequelize.sync();
// const UnitModel = db.units;

export async function addUnit(
  req: NextApiRequest,
  res: NextApiResponse //<IUnit | { error: unknown }>
) {
  try {
    const { number, tenantOne, tenantTwo } = req.body;
    if (number && tenantOne) {
      const unit = await UnitModel.create({
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