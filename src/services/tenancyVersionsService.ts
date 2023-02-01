import { ITenancyVersions } from "../../types/interfaces";
import { fetchData } from "./fetchFactory";

export async function getAllTenancyVersions() {
  return await fetchData<ITenancyVersions[]>("/tenancyVersions", {
    method: "GET",
  });

}
