import { IUnit } from "../../types/interfaces";
import { fetchData } from "./fetchFactory";

export async function createUnit(data: IUnit) {
  return await fetchData<IUnit>("/units", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllUnits(communityId: string) {
  return await fetchData<IUnit[]>(`/units/by-community/${communityId}`, {
    method: "GET",
  });
}

export async function getUnitById(unitId: string) {
  return await fetchData<IUnit>(`/units/${unitId}`, {
    method: "GET",
  });
}

export async function getUnitListWithAllVersions(communityId: string) {
  return await fetchData<IUnit[]>(`/units/allVersions/${communityId}`, {
    method: "GET",
  });
}
