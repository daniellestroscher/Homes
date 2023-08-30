/** @jsxImportSource theme-ui */
"use client";

import { useUnitListContext } from "@/contexts/unitListContext";
import SearchBar from "../SearchBar";
import { useColorMode } from "theme-ui";
import { useEffect, useState } from "react";
import { ICommunity, ITenancy, IUnit } from "../../../types/interfaces";
import { filterUnits } from "@/utils/helperFunctions";
import UnitList from "../UnitList";
import Navbar from "../Navbar";
import TabBar from "../TabBar";
import { useModalContext } from "@/contexts/modalContext";
import AddUnitForm from "../Forms/AddUnitForm";

type Props = {
  community: ICommunity;
  unitArr: IUnit[];
  tenancyArr: ITenancy[];
};
export default function Home({ community, unitArr, tenancyArr }: Props) {
  const { unitList, setUnitList } = useUnitListContext();
  const [colorMode, setColorMode] = useColorMode();
  const { handleModal } = useModalContext();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    //updateList();
    // setUnitList(unitArr);
  }, [tenancyArr, unitArr]);

  // addTenanciesToUnitArr(unitList, tenancyArr as ITenancy[]);

  const filteredUnits = filterUnits(unitArr, searchQuery);

  return (
    <>
      <Navbar
        community={community}
        colorMode={colorMode}
        setColorMode={setColorMode}
      />

      <div
        sx={{
          variant: "containers.mainPageCont",
        }}
      >
        <div sx={{ display: "flex", alignSelf: "flex-end", margin: "10px" }}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <button
            sx={{ variant: "buttons.primary", zIndex: 2 }}
            onClick={() =>
              handleModal(
                <AddUnitForm
                  communityId={community.id as string}
                  unitList={unitList}
                  setUnitList={setUnitList}
                />,
                "Add a Unit!"
              )
            }
          >
            Add
          </button>
        </div>
        <div>
          <div sx={{ height: "40px" }}></div>
          <UnitList unitList={filteredUnits} community={community} />
        </div>
      </div>
    </>
  );
}
