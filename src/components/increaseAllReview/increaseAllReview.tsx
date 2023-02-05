/** @jsxImportSource theme-ui */
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { ITenancyVersions, IUnit } from "../../../types/interfaces";
import { useModalContext } from "../../contexts/modalContext";
import { createRentIncrease } from "../../services/tenancyService";
import { formatDate, formatRentEffectiveDate } from "../../utils/helperFunctions";

type Props = {
  unitList: IUnit[];
};
export default function IncreaseAll(this: any, { unitList }: Props) {
  const { handleModal } = useModalContext();
  const router = useRouter();
  const [increasePercent, setIncreasePercent] = useState<number | undefined>(undefined);
  const [effectiveDate, setEffectiveDate ] = useState<string>(formatDate(formatRentEffectiveDate(new Date), 'yyyy-mm-dd'));
  let rentIncreaseObjArr: ITenancyVersions[] = [];

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (increasePercent) {
      await Promise.all(rentIncreaseObjArr.map((version)=> {
        createRentIncrease({
          tenancyId: version.tenancyId,
          recordEffectiveDate: version.recordEffectiveDate,
          rent: version.rent,
          increaseDate: version.increaseDate,
        })
      }))
      handleModal(null, '');
      router.replace(router.asPath);

    } else {
      alert("Add a percentage to increase by.");
    }
  };

  return (
    <div>
      <form sx={{display: "flex", flexDirection: "column"}}>
        <label sx={{variant: "containers.visuallyHidden"}}>rent increase percentage:</label>
        <input
          type='number'
          title='Increase Percent'
          value={increasePercent}
          onChange={ e => setIncreasePercent(Number(e.target.value)) }
          placeholder="Increase Percent"
          sx={{padding: "5px", margin: "5px 0px", border: "none", borderRadius: "3px"}}
        />
        <label sx={{variant: "containers.visuallyHidden"}}>effective date:</label>
        <input
          type='date'
          title="Effective Date"
          value={effectiveDate}
          onChange={e => setEffectiveDate(e.target.value)}
          placeholder="Effective Date"
          sx={{padding: "5px", margin: "5px 0px", border: "none", borderRadius: "3px", }}
        />
      </form>
      {
        unitList.map((unit)=> {
          let increasedRent;
          if (unit.tenancies && unit.tenancies[0].tenancy_versions && unit.tenancies[0].tenancy_versions[0].rent && increasePercent) {
            let rent = unit.tenancies[0].tenancy_versions[0].rent;
            let increaseDiff = Number(rent.toString().slice(1)) * (increasePercent/100);
            increasedRent = Number(rent.toString().slice(1)) + increaseDiff;
            increasedRent = Number(increasedRent.toFixed(2));

            rentIncreaseObjArr.push({
              tenancyId: unit.tenancies[0].tenancyId as string,
              recordEffectiveDate: effectiveDate,
              rent: increasedRent,
              increaseDate: undefined, //updates in the controller
            })
          }
          return (
            <div key={unit.number}>
              <section sx={{border: '3px solid gray', borderRadius: '3px', padding: "10px"}}>
                {unit.tenancies && unit.tenancies[0].tenancy_versions && unit.tenancies[0].tenancy_versions[0] && unit.tenancies[0].tenants &&
                  <div sx={{display: 'flex', justifyContent: 'space-between', gap: "10px"}}>
                    <h4>{"#" + unit.number + " " + unit.tenancies[0].tenants[0].lastName}</h4>
                    <div>{unit.tenancies[0].tenancy_versions[0].rent}</div>
                    <FontAwesomeIcon icon={faArrowRightLong as IconProp} sx={{height: "15px"}}/>
                    <div>{increasePercent ? `$${increasedRent}` : unit.tenancies[0].tenancy_versions[0].rent}</div>
                  </div>
                }
              </section>
            </div>
          )
        })
      }
      <button
        onClick={handleSubmit}
        sx={{variant: "buttons.secondary", border: "2px solid white", borderRadius: "4px"}}
      >
        Increase All
      </button>
    </div>
  );
}
