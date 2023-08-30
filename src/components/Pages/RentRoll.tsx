/** @jsxImportSource theme-ui */
'use client'

import RentRoll from "@/components/RentRoll";
import Navbar from "@/components/Navbar";

import { ICommunity, ITenancyVersions, IUnit } from "../../../types/interfaces";

import { useColorMode } from "theme-ui";

type Props = {
  community: ICommunity;
  unitArr: IUnit[];
  allVersions: ITenancyVersions[];
};
export default function RentRollLayout({
  community,
  unitArr,
  allVersions,
}: Props) {
  const [colorMode, setColorMode] = useColorMode();

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
          // left: "60px",
          // ...(menuToggle && {
          //   variant: "containers.mainPageCont",
          //   left: "175px",
          // }),
        }}
      >
        <RentRoll
          unitArr={unitArr}
          allVersions={allVersions}
          colorMode={colorMode}
        />
      </div>
    </>
  );
}
