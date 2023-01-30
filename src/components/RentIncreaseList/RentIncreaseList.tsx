/** @jsxImportSource theme-ui */
import { ITenancy, IUnit } from "../../../types/interfaces";
import RentIncreaseItem from "../RentIncreaseItem/RentIncreaseItem";
import { orderBy } from "lodash";

type Props = {
  unitList: IUnit[];
};
export default function RentIncreaseList({ unitList }: Props) {
  let orderedUnitsList = orderBy(
    unitList,
    [
      (a) =>
        a.tenancies &&
        a.tenancies[0] &&
        a.tenancies[0].tenancy_versions &&
        a.tenancies[0].tenancy_versions[0].increaseDate, //sort by increase date.
    ],
    ["asc"]
  ).map((unitList) => unitList);

  return (
    <>
      {!unitList.length && (
        <p sx={{ variant: "components.message" }}>
          Start by adding a unit to your community!
        </p>
      )}
      <div sx={{ variant: "containers.unitList" }}>
        {orderedUnitsList &&
          orderedUnitsList.map((unit: IUnit) => {
            return (
              <RentIncreaseItem
                key={unit.unitId}
                unit={unit}
                tenancy={unit.tenancies && (unit.tenancies[0] as ITenancy)}
              />
            );
          })}
      </div>
    </>
  );
}
