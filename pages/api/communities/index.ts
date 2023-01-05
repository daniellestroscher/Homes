import nc from "next-connect";
import { createCommunity, getAllCommunities } from "../../../controllers/communities";

const handler = nc().get(getAllCommunities).post(createCommunity);

export default handler;
