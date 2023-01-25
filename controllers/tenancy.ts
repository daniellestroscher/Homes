import { NextApiRequest, NextApiResponse } from "next";
import TenancySchema from "../models/tenancy";
import TenantSchema from "../models/tenant";

export async function createTenancy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      unitId,
      rent,
      establishedDate,
      notes,
      assignmentOfLease,
      pet,
      documents,
    } = req.body;
    if (rent) {
      const tenancy = await TenancySchema.create({
        unitId,
        rent,
        establishedDate,
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
    console.log(error, "Error in tenancy controller GET-BY-ID");
    res.status(500).json({ error });
  }
}

export async function updateNotes(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { unitId } = req.query;
    const notes = req.body;
    if (unitId && notes) {
      console.log("in the controller!!!!!!!!!!!!!!!!!");
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
