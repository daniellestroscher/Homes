import { NextApiRequest, NextApiResponse } from "next";
import db from "../models/index";
import { IUnit } from "../types/interfaces";

db.sequelize.sync();
const UnitModel = db.units;

export async function addUnit(
  req: NextApiRequest,
  res: NextApiResponse<IUnit | { error: unknown }>
) {
  try {
    const unit = await UnitModel.create({
      id: req.body.id,
      number: req.body.number,
      tenantOne: req.body.tenantOne,
      tenantTwo: req.body.tenantTwo,
    });

    return res.status(200).json(unit);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
