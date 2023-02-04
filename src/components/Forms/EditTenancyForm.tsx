/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { ICommunity, ITenancy, ITenant } from "../../../types/interfaces";
import { editTenancy } from "../../services/tenancyService";
import { useModalContext } from "../../contexts/modalContext";
import { useRouter } from "next/router";

type Props = {
  tenancy?: ITenancy;
};
export default function EditTenancyForm({
  tenancy

}: Props) {
  let tenants = tenancy?.tenants;
  let defaultTenantOne;
  let defaultTenantTwo;
  tenants && tenants[0] ? defaultTenantOne = tenants[0] as ITenant : null
  tenants && tenants[1] ? defaultTenantTwo = tenants[1] as ITenant : null


  const [updateTenancy, setUpdateTenancy] = React.useState<ITenancy>(tenancy as ITenancy)
  const [tenantOne, setTenantOne] = React.useState<ITenant>(defaultTenantOne as ITenant);
  const [tenantTwo, setTenantTwo] = React.useState<ITenant>(defaultTenantTwo as ITenant);
  const { handleModal } = useModalContext();
  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (updateTenancy) {
      const updates = {
        tenancy: updateTenancy as ITenancy,
        tenantOne: tenantOne,
        tenantTwo: tenantTwo
      }
      console.log(tenancy, tenantOne, tenantTwo)
      editTenancy(tenancy?.unitId as string, updates)
      handleModal(null, '');
      router.replace(router.asPath);
    } else {
      alert("Make a change to update");
    }
  };

  return (
    <form>
      <section>
        <h4>Edit Tenants</h4>
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
        {/* <input
          type="number"
          placeholder="Rent"
          value={tenancyVersions.rent as number}
          onChange={(e) =>
            setTenancyVersions({ ...tenancyVersions, rent: Number(e.target.value) })
          }
        /> */}
        <label>Assignment Of Lease?</label>
        <input
          type="checkbox"
          checked={updateTenancy.assignmentOfLease}
          onChange={(e) =>
            setUpdateTenancy({ ...updateTenancy, assignmentOfLease: e.target.checked })
          }
        />
        <label>Pet?</label>
        <input
          type="checkbox"
          checked={updateTenancy.pet}
          onChange={(e) => setUpdateTenancy({ ...updateTenancy, pet: e.target.checked })}
        />
        {/* <input
          type="file"
          //value={tenancy.documents as File[]}
        /> */}
      </section>
      <button type="submit" onClick={async (e) => await handleSubmit(e)}>
        Edit Tenancy
      </button>
    </form>
  );
}
