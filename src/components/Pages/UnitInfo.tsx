/** @jsxImportSource theme-ui */
'use client'

import Navbar from "../../../src/components/Navbar";
import { ICommunity, ITenancy, IUnit } from "../../../types/interfaces";;
import { UnitInfo } from "../../../src/components/UnitInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useColorMode } from "theme-ui";
import { useEffect } from "react";
import {
  changeStatus,
  formatDate,
  getCurrentTenancy,
  getEstablishedTenancies,
  getFutureTenancy,
} from "../../../src/utils/helperFunctions";

type Props = {
  community: ICommunity;
  unit: IUnit;
};
export default function UnitInfoLayout({ community, unit }: Props) {
  const router = useRouter();
  const [colorMode, setColorMode] = useColorMode();
  useEffect(() => {
    if (establishedTenancies.length) {
      console.log("there are established tenancies");
      changeStatus(currentTenancy as ITenancy, unit);
    }
  }, [unit.tenancies]);

  console.log(unit, "UNIT")

  let establishedTenancies = getEstablishedTenancies(unit.tenancies as ITenancy[]);
  let currentTenancy = getCurrentTenancy(establishedTenancies as ITenancy[]);
  let futureTenancyAvailable = getFutureTenancy(unit.tenancies as ITenancy[]);

  console.log(currentTenancy, "CURRENT")
  console.log(establishedTenancies, "ESTBALISHED")
  console.log(futureTenancyAvailable, "FUTURe")

  return (
    <>
      <Navbar
        community={community}
        colorMode={colorMode}
        setColorMode={setColorMode}
      />
      <FontAwesomeIcon
        icon={faArrowLeft}
        sx={{
          position: "fixed",
          top: "130px",
          left: "20px",
          size: "17px",
          cursor: "pointer",
        }}
        onClick={router.back}
      />
      <UnitInfo
        currentTenancy={currentTenancy}
        futureTenancy={futureTenancyAvailable}
        unit={unit}
        community={community}
      />
    </>
  );
}
