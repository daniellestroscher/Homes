import nc from 'next-connect';
import { addUser  } from '../../../controllers/users';

//const handler = nc().use(verifyToken).post(createLocation);
const handler = nc().post(addUser);

export default handler;