/** @jsxImportSource theme-ui */
import React from "react";
import {
  ICommunity,
  ITenancy,
  ITenant,
  IUnit,
} from "../../../types/interfaces";
import { useModalContext } from "../../contexts/modalContext";
import { createTenant } from "../../services/tenantService";
import { createTenancy } from "../../services/tenancyService";

type Props = {
  community: ICommunity;
  unit: IUnit;
};
export default function AddTenancyForm({ community, unit }: Props) {
  const { handleModal } = useModalContext();
  const [tenantOne, setTenantOne] = React.useState<ITenant>({
    tenantId: "",
    tenancyId: "",
    firstName: "",
    lastName: "",
  });
  const [tenantTwo, setTenantTwo] = React.useState<ITenant>({
    tenancyId: "",
    firstName: "",
    lastName: "",
  });
  const initialTenancy = {
    unitId: "",
    // tenantOne: '',
    // tenantTwo: '',
    rent: undefined,
    notes: undefined,
    assignmentOfLease: undefined,
    pet: undefined,
    documents: undefined,
  };
  const [tenancy, setTenancy] = React.useState<ITenancy>(initialTenancy);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (tenantOne && tenancy && tenancy.rent) {
      console.log("in submit handler");
      const newTenancy = await createTenancy({
        unitId: unit.unitId as string,
        //tenantOne: newTenantOne?.tenantId as string,
        //tenantTwo: newTenantTwo?.tenantId as string,
        rent: tenancy.rent as number,
        notes: tenancy.notes,
        assignmentOfLease: tenancy.assignmentOfLease,
        pet: tenancy.pet,
        documents: tenancy.documents,
      });
      console.log(newTenancy, "IM THE TENANCY");
      const newTenantOne = (await createTenant({
        tenancyId: newTenancy?.tenancyId as string,
        firstName: tenantOne.firstName,
        lastName: tenantOne.lastName,
      })) as ITenant;
      console.log(newTenantOne, "IM THE TENANT ONE");
      const newTenantTwo = (await createTenant({
        tenancyId: newTenancy?.tenancyId as string,
        firstName: tenantTwo.firstName,
        lastName: tenantTwo.lastName,
      })) as ITenant;
      console.log(newTenantTwo, "IM THE TENANT TWO");
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
          value={tenantOne.firstName}
          onChange={(e) =>
            setTenantOne({
              ...tenantOne,
              firstName: e.target.value,
            })
          }
        ></input>
        <input
          type="text"
          placeholder="Last Name"
          value={tenantOne.lastName}
          onChange={(e) =>
            setTenantOne({
              ...tenantOne,
              lastName: e.target.value,
            })
          }
        ></input>
        <h6>Tenant Two</h6>
        <input
          type="text"
          placeholder="First Name"
          value={tenantTwo.firstName}
          onChange={(e) =>
            setTenantTwo({
              ...tenantTwo,
              firstName: e.target.value,
            })
          }
        ></input>
        <input
          type="text"
          placeholder="Last Name"
          value={tenantTwo.lastName}
          onChange={(e) =>
            setTenantTwo({
              ...tenantTwo,
              lastName: e.target.value,
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
          onChange={(e) =>
            setTenancy({ ...tenancy, rent: Number(e.target.value) })
          }
        ></input>
        <label>Assignment Of Lease?</label>
        <input
          type="checkbox"
          checked={tenancy.assignmentOfLease}
          onChange={(e) =>
            setTenancy({ ...tenancy, assignmentOfLease: e.target.checked })
          }
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
