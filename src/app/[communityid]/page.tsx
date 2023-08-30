// import { useEffect, useState } from "react";
import Menu from "@/components/Menu";
import UnitList from "@/components/UnitList";
import Navbar from "@/components/Navbar";
import { authOptions } from "../../auth";
import { getServerSession } from "next-auth";
import { ICommunity, ITenancy, IUnit } from "../../../types/interfaces";
import { getCommunityById } from "@/services/communityService";
import { getAllUnits } from "@/services/unitService";
// import { useUnitListContext } from "@/contexts/unitListContext";
import { getAllTenancies } from "@/services/tenancyService";
// import { useMenuContext } from "@/contexts/menuContext";
// import { useColorMode } from "theme-ui";
// import SearchBar from "@/components/SearchBar";
// import {
//   addTenanciesToUnitArr,
//   changeStatus,
//   filterUnits,
//   getCurrentTenancy,
//   getEstablishedTenancies,
// } from "@/utils/helperFunctions";
// import TabBar from "@/components/TabBar";
import { redirect } from "next/navigation";
import Home from "@/components/Pages/Home";
import TabBar from "@/components/TabBar";

export default async function HomePage({
  params,
}: {
  params: { communityid: string };
}) {
  const communityId = params.communityid;
  const { session, tenancyArr, unitArr, community } = await getData(
    communityId
  );

  return (
    <>
      {session && (
        <>
          <Home
            community={community}
            unitArr={unitArr}
            tenancyArr={tenancyArr}
          />
        </>
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
  const tenancyArr = (await getAllTenancies()) as ITenancy[];

  return {
    session,
    community,
    unitArr,
    tenancyArr,
  };
}
