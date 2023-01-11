import nc from "next-connect";
import { getUnitById } from "../../../../controllers/units";

const handler = nc().get(getUnitById);

export default handler;
