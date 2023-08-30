/** @jsxImportSource theme-ui */
"use client";

import { useUnitListContext } from "@/contexts/unitListContext";
import { useEffect, useState } from "react";
import { useColorMode } from "theme-ui";
import Navbar from "../Navbar";
import SearchBar from "../SearchBar";
import RentIncreaseList from "../RentIncreaseList";
import { Session } from "next-auth";
import { ICommunity, ITenancy, IUnit } from "../../../types/interfaces";
import { filterUnits } from "@/utils/helperFunctions";

type Props = {
  community: ICommunity;
  unitArr: IUnit[];
  tenancyArr: ITenancy[];
};
export default function RentIncrease({
  community,
  unitArr,
  tenancyArr,
}: Props) {
  const { unitList, setUnitList } = useUnitListContext();
  const [colorMode, setColorMode] = useColorMode();

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setUnitList(unitArr);
  }, [unitArr]);

  // addTenanciesToUnitArr(unitList, tenancyArr);
  const filteredUnits = filterUnits(unitList, searchQuery);

  return (
    <>
      <Navbar
        community={community}
        colorMode={colorMode}
        setColorMode={setColorMode}
      />
      {/* <Menu communityId={community.communityId as string} /> */}
      <div
        sx={{
          variant: "containers.mainPageCont",
        }}
      >
        <div
          sx={{
            display: "flex",
            alignSelf: "flex-end",
            margin: "10px",
          }}
        >
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

        </div>
          <RentIncreaseList community={community} unitList={filteredUnits} />
      </div>
    </>
  );
}
