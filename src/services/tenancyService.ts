import { ITenancy, ITenancyVersions, ITenant } from "../../types/interfaces";
import { fetchData } from "./fetchFactory";

export async function createTenancy(data: ITenancy) {
  return await fetchData<ITenancy>("/tenancy", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllTenancies() {
  return await fetchData<ITenancy[]>("/tenancy", {
    method: "GET",
  });
}

export async function getTenancyById(unitId: string) {
  return await fetchData<ITenancy>(`/tenancy/${unitId}`, {
    method: "GET",
  });
}

export async function updateNotes(unitId: string, notes: string) {
  return await fetchData<string>(`/tenancy/${unitId}`, {
    method: "PUT",
    body: JSON.stringify(notes),
  });
}

export async function createRentIncrease(rentIncrease: ITenancyVersions) {
  return await fetchData<string>(`/tenancy/rent`, {
    method: "POST",
    body: JSON.stringify(rentIncrease),
  })
}

export async function editTenancy(unitId: string, updates: {tenancy: ITenancy, tenantOne: ITenant, tenantTwo: ITenant}) {
  return await fetchData(`/tenancy/${unitId}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  })
}
