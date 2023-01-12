import nc from "next-connect";
import { createTenant } from '../../../controllers/tenants';

const handler = nc().post(createTenant);

export default handler;