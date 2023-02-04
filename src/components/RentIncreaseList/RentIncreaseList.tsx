/** @jsxImportSource theme-ui */
import { ITenancy, IUnit } from "../../../types/interfaces";
import RentIncreaseItem from "../RentIncreaseItem/RentIncreaseItem";
import { orderBy } from "lodash";
import { increasesToSend } from "../../utils/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useModalContext } from "../../contexts/modalContext";
import IncreaseAll from "../increaseAllReview/increaseAllReview";

type Props = {
  unitList: IUnit[];
};
export default function RentIncreaseList({ unitList }: Props) {
  const [visibility, setVisibility] = useState<boolean>(true);
  let { handleModal } = useModalContext();
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

  let sendTheseIncreases = increasesToSend(orderedUnitsList);

  return (
    <>
      {!unitList.length && (
        <p sx={{ variant: "components.message" }}>
          No units match your search, or start by adding a unit!
        </p>
      )}
      {visibility ?
        <div sx={{ variant: "containers.increasesBox" }}>
          <section sx={{display: 'flex', gap:'10px'}}>
            <FontAwesomeIcon
              icon={faEyeSlash as IconProp}
              sx={{height: '13px', cursor: "pointer"}}
              onClick={()=>setVisibility(!visibility)}
            />
            <h5>Increases to send this month:</h5>
          </section>
          {sendTheseIncreases.length > 0 ?
            <section sx={{ variant: "containers.unitList" }}>
              {sendTheseIncreases &&
                sendTheseIncreases.map((unit: IUnit, i) => {
                  return (
                    <RentIncreaseItem
                      key={i + 1}
                      unit={unit}
                      tenancy={unit.tenancies && (unit.tenancies[0] as ITenancy)}
                      selector={true}
                    />
                  );
                })}
            </section>
            :
            <div sx={{alignSelf: "center"}}>no due increases found.</div>
          }
          <button
            sx={{variant: 'buttons.secondary', marginTop: "10px", width: '100px'}}
            onClick={() => handleModal(
              <IncreaseAll unitList={sendTheseIncreases}/>,
              'Are you sure you want to increase the following rents?'
            )}
          >
              Increase all
          </button>
        </div>
        :
        <div sx={{marginLeft: '10px'}}>
          <button
                sx={{variant: 'buttons.secondary'}}
                onClick={()=>setVisibility(!visibility)}
          >
            Show due increases
          </button>
        </div>
      }
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
