import { ICommunity } from '../../types/interfaces';
import { fetchData } from './fetchFactory';

export async function createCommunity(data:ICommunity | any){

  return await fetchData<ICommunity | any>(
    '/communities',
    { method: 'POST', body: JSON.stringify(data)},
  );
}