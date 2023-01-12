import nc from "next-connect";
import { createTenancy } from '../../../controllers/tenancy';

const handler = nc().post(createTenancy);

export default handler;