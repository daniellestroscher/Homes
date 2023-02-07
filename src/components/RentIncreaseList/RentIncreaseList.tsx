/** @jsxImportSource theme-ui */
import { ITenancy, IUnit } from "../../../types/interfaces";
import RentIncreaseItem from "../RentIncreaseItem/RentIncreaseItem";
import { orderBy } from "lodash";
import { increasesToSend } from "../../utils/helperFunctions";
import DueRentIncreaseBox from "../DueRentIncreaseBox/DueRentIncreaseBox";

type Props = {
  unitList: IUnit[];
};
export default function RentIncreaseList({ unitList }: Props) {
  console.log(unitList, 'in rent increase list')
  let orderedUnitsList = unitList;
  orderBy(
    unitList,
    [
      (unit) =>
      unit.tenancies &&
      unit.tenancies[0] &&
      unit.tenancies[0].tenancy_versions &&
      unit.tenancies[0].tenancy_versions[0] &&
      unit.tenancies[0].tenancy_versions[0].increaseDate //sort by increase date.
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
      <DueRentIncreaseBox sendTheseIncreases={sendTheseIncreases}/>
      <div sx={{ variant: "containers.unitList" }}>
        {orderedUnitsList &&
          orderedUnitsList.map((unit: IUnit) => {
            return (
              <RentIncreaseItem
                key={unit.unitId}
                unit={unit}
                tenancy={unit.tenancies && (unit.tenancies[0] as ITenancy)}
                selector={false}
              />
            );
          })}
      </div>
    </>
  );
}
