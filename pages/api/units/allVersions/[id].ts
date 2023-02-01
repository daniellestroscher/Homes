import nc from "next-connect";
import { getUnitListWithAllVersions } from "../../../../controllers/units";

const handler = nc().get(getUnitListWithAllVersions);

export default handler;