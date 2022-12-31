import nc from 'next-connect';
import { addUser  } from '../../../controllers/users';
//import verifyToken from '../../../middleware/verifyToken';

//const handler = nc().use(verifyToken).post(createLocation);
const handler = nc().post(addUser);

export default handler;