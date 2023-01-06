import { NextApiRequest, NextApiResponse } from "next";
import UnitSchema from "../models/unit";
import { sequelize } from "../database/connection";

export async function addUnit(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { communityId, number } = req.body;
    if (number) {
      const unit = await UnitSchema.create({
        communityId,
        number,
      });
      return res.status(200).json(unit);
    }
  } catch (error) {
    console.log(error, "Error in units controller");
    res.status(500).json({ error });
  }
}

export async function getUnitList(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    if (id) {
      const unitList = await sequelize.query(
        'SELECT * FROM "units" WHERE "communityId" = (:id)',
        {
          replacements: { id },
          model: UnitSchema,
        }
      );
      return res.status(200).json(unitList);
    }
  } catch (error) {
    console.log(error, "Error in units controller");
    res.status(500).json({ error });
  }
}
