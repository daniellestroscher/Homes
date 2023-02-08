import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getTenanciesByIdWithAllVersions } from "../../../../controllers/tenancy";

const handler = nc<NextApiRequest, NextApiResponse>().get(getTenanciesByIdWithAllVersions);

export default handler;
