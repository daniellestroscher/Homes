import nc from 'next-connect';
import { getUnitById, getUnitList  } from '../../../../controllers/units';
//import verifyToken from '../../../middleware/verifyToken';

//const handler = nc().use(verifyToken).post(createLocation);
const handler = nc().get(getUnitById).get(getUnitList);

export default handler;