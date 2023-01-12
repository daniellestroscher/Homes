import { ICommunity } from "../../types/interfaces";
import { fetchData } from "./fetchFactory";

export async function createCommunity(data: ICommunity) {
  return await fetchData<ICommunity>(
    "/communities",
    {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAllCommunities() {
  return await fetchData<ICommunity[]>(
    "/communities",
    { method: "GET" }
  );
}

export async function getCommunityById(communityId: string) {
  return await fetchData<ICommunity[]>(
    `/communities/${communityId}`,
    { method: "GET"}
  );
}
