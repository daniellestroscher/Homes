import nc from "next-connect";
import { getTenancyById } from '../../../controllers/tenancy';

const handler = nc().get(getTenancyById);

export default handler;