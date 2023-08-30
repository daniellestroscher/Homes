/** @jsxImportSource theme-ui */
import { ICommunity, ITenancy, IUnit } from "../../types/interfaces";
import RentIncreaseItem from "./RentIncreaseItem";
import { orderBy } from "lodash";
import { increasesToSend } from "../utils/helperFunctions";
import DueRentIncreaseBox from "./DueRentIncreaseBox";
import { useState } from "react";

type Props = {
  community: ICommunity;
  unitList: IUnit[];
};
export default function RentIncreaseList({ community, unitList }: Props) {
  let orderedUnitsList = unitList;
  orderBy(
    unitList,
    [
      (unit) =>
        unit.tenancies &&
        unit.tenancies[0] &&
        unit.tenancies[0].tenancy_versions &&
        unit.tenancies[0].tenancy_versions[0] &&
        unit.tenancies[0].tenancy_versions[0].increaseDate, //sort by increase date.
    ],
    ["asc"]
  ).map((unitList) => unitList);
  //Fix this list.

  let sendTheseIncreases = increasesToSend(orderedUnitsList);

  return (
    <>
      {!unitList.length && (
        <p sx={{ variant: "components.message" }}>
          No units match your search, or start by adding a unit!
        </p>
      )}
      <section sx={{ overflowY: "scroll", height: "85vh" }}>
        <DueRentIncreaseBox sendTheseIncreases={sendTheseIncreases} />
        <div sx={{ variant: "containers.unitList" }}>
          {orderedUnitsList &&
            orderedUnitsList.map((unit: IUnit) => {
              return (
                <RentIncreaseItem
                  key={unit.id}
                  community={community}
                  unit={unit}
                  tenancy={unit.tenancies && (unit.tenancies[0] as ITenancy)}
                  selector={false}
                />
              );
            })}
        </div>
      </section>
    </>
  );
}
