/** @jsxImportSource theme-ui */
import { useState } from "react";
import { ICommunity, ITenancy, IUnit } from "../../types/interfaces";
import { filterUnits } from "../utils/helperFunctions";
import UnitItem from "./UnitItem";
type Props = {
  unitList: IUnit[];
  community: ICommunity;
};
export default function UnitList({ unitList, community }: Props) {
  // if (unitList == undefined) unitList = [];
  console.log(unitList, "UNIT LIST");
  return (
    <>
      {!unitList.length && (
        <p sx={{ variant: "components.message" }}>
          Start by adding a unit to your community!
        </p>
      )}
      <div sx={{ variant: "containers.unitList" }}>
        {unitList &&
          unitList.map((unit: IUnit) => {
            return (
              <UnitItem
                key={unit.id}
                community={community}
                unit={unit}
                tenancies={unit.tenancies}
              />
            );
          })}
      </div>
    </>
  );
}
