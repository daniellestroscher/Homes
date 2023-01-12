/** @jsxImportSource theme-ui */
import React from "react";
import {
  ICommunity,
  ITenancy,
  ITenant,
  IUnit,
} from "../../../types/interfaces";
import { useModalContext } from "../../contexts/modalContext";
// import { createUnit } from "../../services/unitService";

type Props = {
  community: ICommunity;
};
export default function AddTenancyForm({ community }: Props) {
  const { handleModal } = useModalContext();
  const [tenancy, setTenancy] = React.useState<ITenancy>({
    tenantOne: {
      firstName: "",
      lastName: "",
    },
    rent: null,
  });

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (tenancy) {
      console.log(tenancy);
      // const newUnit = await createUnit({
      //   communityId: community.id,
      //   number: unitNumber,
      // });
      // setUnitList([...unitList, newUnit]);
      // setUnitNumber(null);
      // setUnitFormToggle(!unitFormToggle);
      handleModal(null);
    } else {
      alert("All fields are required");
    }
  };
  return (
    <form>
      <section>
        <h4>Add Tenants</h4>
        <h6>Tenant One</h6>
        <input
          type="text"
          placeholder="First Name"
          value={tenancy.tenantOne.firstName}
          onChange={(e) =>
            setTenancy({
              ...tenancy,
              tenantOne: { ...tenancy.tenantOne, firstName: e.target.value },
            })
          }
        ></input>
        <input
          type="text"
          placeholder="Last Name"
          value={tenancy.tenantOne.lastName}
          onChange={(e) =>
            setTenancy({
              ...tenancy,
              tenantOne: { ...tenancy.tenantOne, lastName: e.target.value },
            })
          }
        ></input>
        <h6>Tenant Two</h6>
        <input
          type="text"
          placeholder="First Name"
          value={tenancy.tenantTwo?.firstName}
          onChange={(e) =>
            setTenancy({
              ...tenancy,
              tenantTwo: {
                ...tenancy.tenantTwo,
                firstName: e.target.value,
                lastName: tenancy.tenantTwo?.lastName as string,
              },
            })
          }
        ></input>
        <input
          type="text"
          placeholder="Last Name"
          value={tenancy.tenantTwo?.lastName}
          onChange={(e) =>
            setTenancy({
              ...tenancy,
              tenantTwo: {
                ...tenancy.tenantTwo,
                lastName: e.target.value,
                firstName: tenancy.tenantTwo?.firstName as string,
              },
            })
          }
        ></input>
      </section>
      <section>
        <h4>Other Info</h4>
        <input
          type="number"
          placeholder="Rent"
          value={tenancy.rent as number}
          onChange={(e) => setTenancy({ ...tenancy, rent: Number(e.target.value) })}
        ></input>
        <label>Assignment Of Lease?</label>
        <input
          type="checkbox"
          checked={tenancy.assignmentOfLease}
          onChange={(e) => setTenancy({ ...tenancy, assignmentOfLease: e.target.checked })}
        ></input>
        <label>Pet?</label>
        <input
          type="checkbox"
          checked={tenancy.pet}
          onChange={(e) => setTenancy({ ...tenancy, pet: e.target.checked })}
        ></input>
        <input
          type="text"
          placeholder="Notes..."
          value={tenancy.notes}
          onChange={(e) => setTenancy({ ...tenancy, notes: e.target.value })}
        ></input>
        <label>Add any related Documents</label>
        <input
          type="file"
          //value={tenancy.documents as File[]}
        ></input>
      </section>
      <button type="submit" onClick={async (e) => await handleSubmit(e)}>
        Create Tenancy
      </button>
    </form>
  );
}
