import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { changeTenancyStatus } from "../../../../controllers/tenancy";

const handler = nc<NextApiRequest, NextApiResponse>().patch(changeTenancyStatus);

export default handler;
