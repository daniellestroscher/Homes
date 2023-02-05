/** @jsxImportSource theme-ui */
import { useState } from "react";
import { ITenancyVersions } from "../../../types/interfaces";
import { createRentIncrease } from "../../services/tenancyService";
import { useModalContext } from "../../contexts/modalContext";
import { formatDate, formatRentEffectiveDate } from "../../utils/helperFunctions";
import { useRouter } from "next/router";

type Props = {
  tenancyId: string;
  currentRecordEffectiveDate: string | undefined;
};
export default function AddRentIncreaseForm({ tenancyId, currentRecordEffectiveDate }: Props) {
  const router = useRouter();
  let defaultIncrease = {
    tenancyId: tenancyId,
    recordEffectiveDate: formatDate(formatRentEffectiveDate(new Date), 'yyyy-mm-dd'),
    rent: undefined,
    increaseDate: undefined,
  };
  const [rentIncrease, setRentIncrease] =
    useState<ITenancyVersions>(defaultIncrease);
  const { handleModal } = useModalContext();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (rentIncrease && currentRecordEffectiveDate !== rentIncrease.recordEffectiveDate) {
      await createRentIncrease({
        tenancyId: rentIncrease.tenancyId,
        recordEffectiveDate: rentIncrease.recordEffectiveDate,
        rent: rentIncrease.rent,
        increaseDate: rentIncrease.increaseDate,
      });
      setRentIncrease(defaultIncrease);
      router.replace(router.asPath); //refresh server-side props
      handleModal(null, ''); //close form
    } else {
      alert("All fields are required or change the effective date to one that in not already in use.");
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
