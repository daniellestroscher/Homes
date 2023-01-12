import { ITenant } from "../../types/interfaces";
import { fetchData } from "./fetchFactory";

export async function createTenant(data: ITenant) {
  return await fetchData<ITenant>(
    "/tenants",
    {
    method: "POST",
    body: JSON.stringify(data),
  });
}
