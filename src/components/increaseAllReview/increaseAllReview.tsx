/** @jsxImportSource theme-ui */
import { useState } from "react";
import { IUnit } from "../../../types/interfaces";

import { useModalContext } from "../../contexts/modalContext";

type Props = {
  unitList: IUnit[];
};
export default function IncreaseAll({ unitList }: Props) {
  const [unitNumber, setUnitNumber] = useState<number | undefined>(undefined);
  const { handleModal } = useModalContext();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (unitNumber) {

    } else {
      alert("Sorry there was an error");
    }
  };

  return (
    <div>
      {
        unitList.map((unit)=> {
          return (
            <div key={unit.number}>{unit.number}</div>
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
