/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { ITenancy, ITenancyVersions, ITenant } from "../../../types/interfaces";
import { useModalContext } from "../../contexts/modalContext";
import { createTenant } from "../../services/tenantService";
import {
  changeTenancyStatus,
  createRentIncrease,
  createTenancy,
} from "../../services/tenancyService";

import { formatDate } from "../../utils/helperFunctions";
import { blobToDataURL } from "../../utils/uploadingUtils";

type Props = {
  unitId: string;
  activeTenancy: ITenancy | undefined;
};
export default function AddTenancyForm({ unitId, activeTenancy }: Props) {
  const { handleModal } = useModalContext();

  const [tenantOne, setTenantOne] = React.useState<ITenant>({
    tenancyId: "",
    firstName: "",
    lastName: "",
    tenancy: {} as ITenancy,
  });
  const [tenantTwo, setTenantTwo] = React.useState<ITenant>({
    tenancyId: "",
    firstName: "",
    lastName: "",
    tenancy: {} as ITenancy,
  });
  const initialTenancy = {
    unitId: "",
    establishedDate: new Date().toISOString(),
    notes: "",
    assignmentOfLease: false,
    pet: false,
    documents: [],
    activeStatus: true,
    previousTenancy: null,
  };
  const [tenancy, setTenancy] = React.useState<ITenancy>(initialTenancy);

  const currentDate = new Date();
  const oneYearFromNow = new Date(currentDate);
  oneYearFromNow.setFullYear(currentDate.getFullYear() + 1);
  const initialTenancyVersions = {
    tenancyId: "",
    recordEffectiveDate: new Date().toISOString(),
    rent: undefined,
    increaseDate: oneYearFromNow.toISOString(),
    tenancy: {} as ITenancy,
  };
  const [tenancyVersions, setTenancyVersions] =
    React.useState<ITenancyVersions>(initialTenancyVersions);
  const files = tenancy.documents ? [...tenancy.documents] : [];

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (tenantOne.firstName !== "" && tenancyVersions.rent !== undefined) {
      console.log("in submit handler");
      if (new Date(tenancy.establishedDate).getTime() <= new Date().getTime()) {
        //get tenancy by unit id and change active state because new tenancy is now active.
        let prevTenancyId = activeTenancy?.id;
        const status = await changeTenancyStatus(unitId, prevTenancyId, false);
        console.log(status, "IM THE NEW STATUS");
      }
      if (new Date(tenancy.establishedDate).getTime() > new Date().getTime()) {
        tenancy.activeStatus = false;
      }
      if (activeTenancy) {
        tenancy.previousTenancy = activeTenancy.id as string;
      }
      let docArr = await Promise.all(
        files.map(async (file) => {
          const buffer = await file.arrayBuffer();
          const blob = new Blob([buffer]);
          const dataUrl = await blobToDataURL(blob);
          return dataUrl as File;
        })
      );
      console.log(docArr, "ten docs data");

      const newTenantOne = {
        //tenancyId: newTenancy?.id as string,
        firstName: tenantOne.firstName,
        lastName: tenantOne.lastName,
      };
      const newTenantTwo = {
        // tenancyId: newTenancy?.id as string,
        firstName: tenantTwo.firstName,
        lastName: tenantTwo.lastName,
      };

      const newTenancyVersion = {
        //id: newTenancy?.id as string,
        recordEffectiveDate: new Date(tenancy.establishedDate).toISOString(),
        rent: tenancyVersions.rent.toString(),
        increaseDate: tenancyVersions.increaseDate,
        //tenancy: newTenancy as ITenancy,
      };
      //const { id: newTenancyVersionId } = newTenancy as ITenancy;

      const newTenancy = await createTenancy({
        //unitId: unitId,
        establishedDate: new Date(tenancy.establishedDate).toISOString(),
        notes: tenancy.notes,
        assignmentOfLease: tenancy.assignmentOfLease,
        pet: tenancy.pet,
        documents: docArr,
        activeStatus: tenancy.activeStatus,
        previousTenancy: tenancy.previousTenancy,

        tenants: {
          //@ts-ignore
          create: [newTenantOne, newTenantTwo],
        },
        tenancyVersions: {
          //@ts-ignore
          create: [newTenancyVersion],
        },
        unit: {
          connect: { id: unitId },
        },
      });

      handleModal(null, ""); //close form
    } else {
      alert("Missing fields are required");
    }
  };
  return (
    <form sx={{ variant: "components.form" }}>
      <section>
        <h4>Add Tenants:</h4>
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
        <label sx={{ variant: "containers.visuallyHidden" }}>
          Date Established:
        </label>
        <input
          type="date"
          title="Date of Tenancy Establishment"
          value={tenancy.establishedDate}
          onChange={(e) =>
            setTenancy({ ...tenancy, establishedDate: e.target.value })
          }
        />
        <label sx={{ variant: "containers.visuallyHidden" }}>Rent</label>
        <input
          type="number"
          placeholder="Rent"
          title="Rent"
          value={tenancyVersions.rent as number}
          onChange={(e) =>
            setTenancyVersions({
              ...tenancyVersions,
              rent: Number(e.target.value),
            })
          }
        />
        <br />
        <label>Assignment Of Lease?</label>
        <input
          type="checkbox"
          checked={tenancy.assignmentOfLease}
          onChange={(e) =>
            setTenancy({ ...tenancy, assignmentOfLease: e.target.checked })
          }
        />
        <label>Pet?</label>
        <input
          type="checkbox"
          checked={tenancy.pet}
          onChange={(e) => setTenancy({ ...tenancy, pet: e.target.checked })}
        />
        <label sx={{ variant: "containers.visuallyHidden" }}>Add Notes</label>
        <input
          type="text"
          placeholder="Notes..."
          value={tenancy.notes}
          onChange={(e) => setTenancy({ ...tenancy, notes: e.target.value })}
        />
        <label sx={{ variant: "containers.visuallyHidden" }}>
          Add any related Documents
        </label>
        <input
          type="file"
          onChange={(e) =>
            setTenancy({
              ...tenancy,
              documents: e.target.files as unknown as File[],
            })
          }
          multiple
        />
        <ul>
          {files.map((file, i) => (
            <li key={i}>
              {file.name} - {file.type}
            </li>
          ))}
        </ul>
      </section>
      <button type="submit" onClick={async (e) => await handleSubmit(e)}>
        Create Tenancy
      </button>
    </form>
  );
}
