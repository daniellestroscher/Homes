const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + '/api';

export async function fetchData<T>(
  route: string,
  options?: RequestInit,
  token?: string,
): Promise<T | void> {
  if (options) {
    options.headers = {
      'Content-Type': 'application/json',
    };
    options.mode = 'cors';
    options.cache = 'default';
    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }
  }
  try {
    const res = await fetch(baseUrl + route, options);
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
