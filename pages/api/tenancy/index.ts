import nc from "next-connect";
import { createTenancy, getAllTenancies } from '../../../controllers/tenancy';

const handler = nc().post(createTenancy).get(getAllTenancies);

export default handler;