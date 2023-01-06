import { IUnit } from "../../types/interfaces";
import { fetchData } from "./fetchFactory";

export async function createUnit(data: IUnit | any) {
  return await fetchData<IUnit | any>(
    "/units",
    {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getUnitList(communityId: string) {
  return await fetchData<IUnit[]>(
    `/units/${communityId}`,
    {
    method: "GET",
  });
}

export async function getUnitById(unitId: string) {
  return await fetchData<IUnit[] | any>(
    `/units/${unitId}`,
    {
    method: "GET",
  });

}

