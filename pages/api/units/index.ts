import nc from 'next-connect';
import { addUnit  } from '../../../controllers/units';
//import verifyToken from '../../../middleware/verifyToken';

//const handler = nc().use(verifyToken).post(createLocation);
const handler = nc().post(addUnit);

export default handler;