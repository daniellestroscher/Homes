import nc from "next-connect";
import { getTenancyById } from '../../../controllers/tenancy';
import { updateNotes } from '../../../controllers/tenancy';

const handler = nc().get(getTenancyById).put(updateNotes);

export default handler;