import { authOptions } from "@/auth";
import UnitInfoLayout from "@/components/Pages/UnitInfo";
import { getUnitById } from "@/services/unitService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ICommunity, IUnit } from "../../../../../types/interfaces";
import { getCommunityById } from "@/services/communityService";

export default async function UnitInfoPage({
  params,
}: {
  params: { communityid: string; unitid: string };
}) {
  const communityid = params.communityid;
  const unitid = params.unitid;
  const { session, community, unit } = await getData(communityid, unitid);

  return (
    <>
      {session && (
        <UnitInfoLayout community={community} unit={unit} />
      )}
    </>
  );
}

async function getData(communityId: string, unitId: string) {
  //fetch session to validate
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`api/auth/signin`);
  }
  const community = (await getCommunityById(communityId)) as ICommunity;
  const unit = (await getUnitById(unitId)) as IUnit;
  //const tenancyArr = (await getAllTenancies()) as ITenancy[];

  return {
    session,
    community,
    unit,
  };
}
