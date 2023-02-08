/** @jsxImportSource theme-ui */
import { useState } from "react";
import { ICommunity, IUnit } from "../../../types/interfaces";
import { createUnit } from "../../services/unitService";
import { useModalContext } from "../../contexts/modalContext";

type Props = {
  communityId: string;
  unitList: IUnit[];
  setUnitList: (arg: IUnit[]) => void;
};
export default function AddUnitForm({
  communityId,
  unitList,
  setUnitList,
}: Props) {
  const [unitNumber, setUnitNumber] = useState<string | undefined>(undefined);
  const { handleModal } = useModalContext();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (unitNumber) {
      const newUnit = await createUnit({
        communityId: communityId,
        number: unitNumber,
      });
      setUnitList([...unitList, newUnit] as IUnit[]);
      setUnitNumber(undefined);
      handleModal(null, ''); //close form
    } else {
      alert("All fields are required");
    }
  };

  return (
    <form sx={{ variant: "components.form" }}>
      <input
        value={unitNumber as string}
        type="text"
        onChange={(e) => setUnitNumber(e.target.value)}
        placeholder="Unit Number"
      ></input>

      <button onClick={async (e) => await handleSubmit(e)}>Add Unit</button>
    </form>
  );
}
