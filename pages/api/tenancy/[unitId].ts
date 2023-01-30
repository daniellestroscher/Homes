import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getTenancyById } from "../../../controllers/tenancy";
import { updateNotes, editTenancy } from "../../../controllers/tenancy";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .get(getTenancyById)
  .put(updateNotes)
  .patch(editTenancy);

export default handler;
