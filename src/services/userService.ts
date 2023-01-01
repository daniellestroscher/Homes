import { IUser } from '../../types/interfaces';
import { fetchData } from './fetchFactory';

export async function createUser(token: string, data: string) {
  return await fetchData<IUser>(
    '/users',
    { method: 'POST', body: JSON.stringify({ data }) },
    token,
  );
}