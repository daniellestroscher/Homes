/** @jsxImportSource theme-ui */
import { useState } from "react";
import { ITenancy, IUnit } from "../../../types/interfaces";

type Props = {
  unitList: IUnit[];
};
export default function IncreaseAll({ unitList }: Props) {
  let tenancyList = unitList.map((unit)=> {
    if (unit.tenancies && unit.tenancies[0]) {
      return unit.tenancies[0];
    }
  }) as ITenancy[];
  const [increasePercent, setIncreasePercent] = useState<number | undefined>(undefined);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (increasePercent) {
      console.log('submitted')

    } else {
      alert("Sorry there was an error");
    }
  };

  return (
    <div>
      <form>
        <label sx={{variant: "containers.visuallyHidden"}}>rent increase percentage:</label>
        <input
          type='number'
          value={increasePercent}
          onChange={ e => setIncreasePercent(Number(e.target.value)) }
          placeholder="Increase Percent"
        />
      </form>
      {
        tenancyList.map((tenancy)=> {
          if (tenancy && tenancy.tenancy_versions && tenancy.tenancy_versions[0] && tenancy.tenancy_versions[0].rent && increasePercent) {
            let rent = tenancy.tenancy_versions[0].rent;
            let increaseDiff = rent && rent * (increasePercent/100);
            let increasedRent = rent + increaseDiff;
            console.log(increasedRent)
          }
          return (
            <div key={tenancy.tenancyId}>
              <section sx={{border: '1px solid gray'}}>
                {tenancy && tenancy.tenancy_versions && tenancy.tenancy_versions[0] &&
                  tenancy.tenancy_versions[0].rent

                }

              </section>
              {tenancy.establishedDate}
            </div>
          )
        })
      }
      <button
        onClick={()=>handleSubmit}
        sx={{variant: "buttons.secondary", border: "2px solid white", borderRadius: "4px"}}
      >
        Increase All
      </button>
    </div>
  );
}
