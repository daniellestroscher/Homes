import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import {
  ICommunity,
  ITenancyVersions,
  IUnit,
} from "../../../../types/interfaces";
import { getCommunityById } from "@/services/communityService";
import { getAllTenancyVersions } from "@/services/tenancyVersionsService";

import { getAllUnits } from "@/services/unitService";
import { redirect } from "next/navigation";
import RentRollLayout from "@/components/Pages/RentRoll";

export default async function RentRollPage({
  params,
}: {
  params: { communityid: string };
}) {
  const id = params.communityid;
  const { session, community, unitArr } = await getData(id);
  console.log(session, community, unitArr, "HERE");
  return (
    <>
      {session && (
        <RentRollLayout
          unitArr={unitArr}
          allVersions={[]}
          community={community}
        />
      )}
      Hello?
    </>
  );
}
export async function getData(communityId: string) {
  //fetch session to validate
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`api/auth/signin`);
  }
  const community = (await getCommunityById(communityId)) as ICommunity;
  const unitArr = (await getAllUnits(communityId)) as IUnit[];
  // const tenancyVersions = (await getAllTenancyVersions()) as ITenancyVersions[];

  return {
    session,
    community,
    unitArr,
    // tenancyVersions,
  };
}
