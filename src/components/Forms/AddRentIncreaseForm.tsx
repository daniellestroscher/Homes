/** @jsxImportSource theme-ui */
import { useState } from "react";
import { ITenancyVersions } from "../../../types/interfaces";
import { createRentIncrease } from "../../services/tenancyService";
import { useModalContext } from "../../contexts/modalContext";
import { formatDate } from "../../utils/helperFunctions";

type Props = {
  tenancyId: string;
};
export default function AddRentIncreaseForm({ tenancyId }: Props) {
  let defaultIncrease = {
    tenancyId: tenancyId,
    recordEffectiveDate: formatDate(new Date(), "yyyy-mm-dd"),
    rent: undefined,
    increaseDate: undefined,
  };
  const [rentIncrease, setRentIncrease] =
    useState<ITenancyVersions>(defaultIncrease);
  const { handleModal } = useModalContext();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (rentIncrease) {
      await createRentIncrease({
        tenancyId: rentIncrease.tenancyId,
        recordEffectiveDate: rentIncrease.recordEffectiveDate,
        rent: rentIncrease.rent,
        increaseDate: rentIncrease.increaseDate,
      });
      setRentIncrease(defaultIncrease);
      handleModal(null); //close form
    } else {
      alert("All fields are required");
    }
  };

  return (
    <form sx={{ variant: "components.form" }}>
      <input
        value={rentIncrease.rent as number}
        type="number"
        onChange={(e) =>
          setRentIncrease({ ...rentIncrease, rent: Number(e.target.value) })
        }
        placeholder="new rent"
      />
      <input
        value={rentIncrease.recordEffectiveDate}
        type="date"
        onChange={(e) =>
          setRentIncrease({
            ...rentIncrease,
            recordEffectiveDate: e.target.value,
          })
        }
      />

      <button onClick={async (e) => await handleSubmit(e)}>Add Increase</button>
    </form>
  );
}
