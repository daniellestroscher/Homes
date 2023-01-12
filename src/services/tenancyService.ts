import { ITenancy } from "../../types/interfaces";
import { fetchData } from "./fetchFactory";

export async function createTenancy(data: ITenancy) {
  return await fetchData<ITenancy>(
    "/tenancy",
    {
    method: "POST",
    body: JSON.stringify(data),
  });
}