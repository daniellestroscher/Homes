import { NextApiRequest, NextApiResponse } from "next";
import { Op, where } from "sequelize";
import TenancySchema from "../models/tenancy";
import TenancyVersionSchema from "../models/tenancy_versions";
import TenantSchema from "../models/tenant";
import { formatDate } from "../src/utils/helperFunctions";
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
      activeStatus,
      previousTenancy,
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
      activeStatus,
      previousTenancy,
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
      include: [
        TenantSchema,
        {
          model: TenancyVersionSchema,
          where: {
            recordEffectiveDate: {
              [Op.lte]: formatDate(new Date(), "yyyy-mm-dd"),
            }
          },
          limit: 1,
        },
      ],

    });
    return res.status(200).json(tenancy);
  } catch (error) {
    console.log(error, "Error in tenancy controller GET-ALL");
    res.status(500).json({ error });
  }
}

export async function getTenanciesById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { unitId } = req.query;
    if (unitId) {
      const tenancy = await TenancySchema.findAll({
        where: { unitId: unitId },
        order: [["establishedDate", "DESC"]],
        include: [
          TenantSchema,
          {
            model: TenancyVersionSchema,
            where: {
              recordEffectiveDate: {
                [Op.lte]: formatDate(new Date(), "yyyy-mm-dd"),
              }
            },
            //order: [["recordEffectiveDate", "DESC"]],
            limit: 1,
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

export async function editTenancy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const updates = req.body;
    //const { unitId } = req.query;
    if (updates) {
      console.log('in edit tenancy controller')
      const updatedTenancy = await TenancySchema.update(
        {
          pet: updates.tenancy.pet,
          assignmentOfLease: updates.tenancy.assignmentOfLease,
        },
        { where: { tenancyId: updates.tenancyId } }
      );
      if (updates.tenantOne) {
        const updatedTenantOne = await TenantSchema.update(
          {
            firstName: updates.tenantOne.firstName,
            lastName: updates.tenantOne.lastName,
          },
          {
            where: { tenantId: updates.tenantOne.tenantId },
          }
        );
      }
      if (updates.tenantTwo) {
        const updatedTenantTwo = await TenantSchema.update(
          {
            firstName: updates.tenantTwo.firstName,
            lastName: updates.tenantTwo.lastName,
          },
          {
            where: { tenantId: updates.tenantTwo.tenantId },
          }
        );
        return res.status(200).json(updatedTenancy);
      }
    }
  } catch (error) {
    console.log(error, "Error in tenancy controller EDIT-TENANCY");
    res.status(500).json({ error });
  }
}

export async function changeTenancyStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {status, tenancyId} = req.body;
    const { unitId } = req.query;
    console.log(status, tenancyId, "IN CONTROLLER");
    if(tenancyId) {
      const updatedStatus = await TenancySchema.update(
        { activeStatus: status },
        { where: { tenancyId: tenancyId } }
      );
      return res.status(200).json(updatedStatus);
    } else {
      const updatedStatus = await TenancySchema.update(
        { activeStatus: status },
        { where: { unitId: unitId } }
      );
      return res.status(200).json(updatedStatus);
    }
  } catch (error) {
    console.log(error, "Error in tenancy controller CHANGE-TENANCY-STATUS");
    res.status(500).json({ error });
  }
}
