import nc from "next-connect";
import { getAllTenancyVersions } from '../../../controllers/tenancy_versions';

const handler = nc().get(getAllTenancyVersions);

export default handler;