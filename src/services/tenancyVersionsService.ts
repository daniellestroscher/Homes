import { ITenancyVersions } from "../../types/interfaces";
import { fetchData } from "./fetchFactory";

export async function getAllTenancyVersions() {
  console.log("get attepted")
  return await fetchData<ITenancyVersions[]>("/tenancy/versions", {
    method: "GET",
  });

}
