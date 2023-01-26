import { NextApiRequest, NextApiResponse } from "next";
import { where } from "sequelize";
import TenancySchema from "../models/tenancy";
import TenancyVersionSchema from "../models/tenancy_versions";
import TenantSchema from "../models/tenant";
import { ITenancy } from "../types/interfaces";

export async function createTenancy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      unitId,
      establishedDate,
      notes,
      assignmentOfLease,
      pet,
      documents,
    } = req.body;

    // if (establishedDate) {
    //   //create the rent increase date
    //   let { increaseDate } = req.body;
    //   increaseDate = establishedDate.split("");
    //   increaseDate[3] = (Number(increaseDate[3]) + 1).toString();
    //   increaseDate = increaseDate.join("");

      const tenancy = await TenancySchema.create({
        unitId,
        establishedDate,
        notes,
        assignmentOfLease,
        pet,
        documents,
      });
      return res.status(200).json(tenancy);
    //}
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
      include: [TenantSchema],
    });
    return res.status(200).json(tenancy);
  } catch (error) {
    console.log(error, "Error in tenancy controller GET-ALL");
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
        limit: 1,
        where: { unitId: unitId },
        order: [ [ 'createdAt', 'DESC' ]],
        include: [
          TenantSchema,
          //TenancyVersionSchema,
          {
            association: "tenancy_versions",
            order: [ [ 'recordEffectiveDate', 'DESC' ]],
            limit: 1,
            //where: {max(recordEffectiveDate)},
          },
        ],
      });
      return res.status(200).json(tenancy);
    }
  } catch (error) {
    console.log(error, "Error in tenancy controller GET-BY-ID");
    res.status(500).json({ error });
  }
}

export async function updateNotes(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { unitId } = req.query;
    const notes = req.body;
    if (unitId && notes) {
      const updatedTenancy = await TenancySchema.update(
        { notes: notes },
        {
          where: { unitId: unitId },
        }
      );
      return res.status(200).json(updatedTenancy);
    }
  } catch (error) {
    console.log(error, "Error in tenancy controller UPDATE-NOTES");
    res.status(500).json({ error });
  }
}
