import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { ICommunity, IUnit } from "../../../../types/interfaces";
import { getCommunityById } from "@/services/communityService";

import { redirect } from "next/navigation";
import { getAllUnits } from "@/services/unitService";
import RentIncrease from "@/components/Pages/RentIncrease";

export default async function RentIncreasesPage({
  params,
}: {
  params: { communityid: string };
}) {
  const id = params.communityid
  const { session, community, unitArr } = await getData(id)

  return (
    <>
      {session && (
        <RentIncrease community={community} unitArr={unitArr} tenancyArr={[]}/>
      )}
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
  // const tenancyArr = (await getAllTenancies()) as ITenancy[];

  return {
    session,
    community,
    unitArr,
  };
}