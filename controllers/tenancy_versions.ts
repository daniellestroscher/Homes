import { NextApiRequest, NextApiResponse } from "next";
import { sequelize } from "../database/connection";
import TenancyVersionSchema from "../models/tenancy_versions";

export async function createTenancyVersions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { tenancyId, recordEffectiveDate, rent } = req.body;
    if (tenancyId && rent) {
      //create the rent increase date
      let { increaseDate } = req.body;
      increaseDate = recordEffectiveDate.split("");
      increaseDate[3] = (Number(increaseDate[3]) + 1).toString();
      increaseDate = increaseDate.join("");

      const tenancyVersion = await TenancyVersionSchema.create({
        tenancyId,
        recordEffectiveDate,
        rent,
        increaseDate,
      });
      return res.status(200).json(tenancyVersion);
    }
  } catch (error) {
    console.log(error, "Error in tenancy_versions controller CREATE");
    res.status(500).json({ error });
  }
}
