import nc from "next-connect";
import { getUnitList } from "../../../../controllers/units";

const handler = nc().get(getUnitList);

export default handler;