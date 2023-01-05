import nc from "next-connect";
import { getCommunityById } from '../../../../controllers/communities';

const handler = nc().get(getCommunityById);

export default handler;