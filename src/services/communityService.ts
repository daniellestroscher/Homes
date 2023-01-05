import { ICommunity } from "../../types/interfaces";
import { fetchData } from "./fetchFactory";

export async function createCommunity(data: ICommunity | any) {
  return await fetchData<ICommunity | any>(
    "/communities",
    {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllCommunities() {
  return await fetchData<ICommunity[] | any>(
    "/communities",
    { method: "GET" }
  );
}

export async function getCommunityById(communityId: string) {
  return await fetchData<ICommunity[] | any>(
    `/communities/${communityId}`,
    { method: "GET"}
  );
}
