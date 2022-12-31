import { IUser } from '../../types/interfaces';
import { fetchData } from './fetchFactory';

export async function createUser(token: string, email: string) {
  return await fetchData<IUser>(
    '/users',
    { method: 'POST', body: JSON.stringify({ email }) },
    token,
  );
}