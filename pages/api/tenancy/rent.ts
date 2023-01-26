import nc from "next-connect";
import { createTenancyVersions } from '../../../controllers/tenancy_versions';

const handler = nc().post(createTenancyVersions);

export default handler;