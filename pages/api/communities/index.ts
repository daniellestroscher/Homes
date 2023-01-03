import nc from 'next-connect';
import fileupload from 'express-fileupload'
import { createCommunity  } from '../../../controllers/communities';

//const handler = nc().use(verifyToken).post(createLocation);
const handler = nc().use(fileupload({useTempFiles: true})).post(createCommunity);

export default handler;