/** @jsxImportSource theme-ui */
import React from "react";
import {
  ITenancy,
  ITenancyVersions,
  ITenant,
} from "../../../types/interfaces";
import { useModalContext } from "../../contexts/modalContext";
import { createTenant } from "../../services/tenantService";
import { changeTenancyStatus, createRentIncrease, createTenancy } from "../../services/tenancyService";
import { useRouter } from "next/router";
import { formatDate } from "../../utils/helperFunctions";

type Props = {
  unitId: string;
  activeTenancy: ITenancy | undefined;
};
export default function AddTenancyForm({ unitId, activeTenancy }: Props) {
  const { handleModal } = useModalContext();
  const router = useRouter()
  const [tenantOne, setTenantOne] = React.useState<ITenant>({
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
    establishedDate: formatDate(new Date(), "yyyy-mm-dd"),
    notes: undefined,
    assignmentOfLease: undefined,
    pet: undefined,
    documents: undefined,
    activeStatus: true,
    previousTenancy: null,
  };
  const [tenancy, setTenancy] = React.useState<ITenancy>(initialTenancy);
  const initialTenancyVersions = {
    tenancyId: "",
    recordEffectiveDate: "",
    rent: undefined,
    increaseDate: undefined,
  }
  const [tenancyVersions, setTenancyVersions] = React.useState<ITenancyVersions>(initialTenancyVersions)

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (tenantOne.firstName !== "" && tenancyVersions.rent !== undefined) {
      console.log("in submit handler");
      if (new Date(tenancy.establishedDate).getTime() <= new Date().getTime()) {
        //get tenancy by unit id and change active state because new tenancy is now active.
        let prevTenancyId = activeTenancy?.tenancyId;
        const status = await changeTenancyStatus(unitId, prevTenancyId, false);
        console.log(status, "IM THE NEW STATUS");
      }
      if (new Date(tenancy.establishedDate).getTime() > new Date().getTime()) {
        tenancy.activeStatus = false;
      }
      if (activeTenancy) {
        tenancy.previousTenancy = activeTenancy.tenancyId as string;
      }
      const newTenancy = await createTenancy({
        unitId: unitId,
        establishedDate: tenancy.establishedDate,
        notes: tenancy.notes,
        assignmentOfLease: tenancy.assignmentOfLease,
        pet: tenancy.pet,
        documents: tenancy.documents,
        activeStatus: tenancy.activeStatus,
        previousTenancy: tenancy.previousTenancy,
      });
      console.log(newTenancy, "IM THE TENANCY");
      const newTenancyVersion = await createRentIncrease({
        tenancyId: newTenancy?.tenancyId as string,
        recordEffectiveDate: tenancy.establishedDate,
        rent: tenancyVersions.rent,
        increaseDate: tenancyVersions.increaseDate,
      })
      console.log(newTenancyVersion, "IM THE TENANCY VERSION")
      const newTenantOne = (await createTenant({
        tenancyId: newTenancy?.tenancyId as string,
        firstName: tenantOne.firstName,
        lastName: tenantOne.lastName,
      })) as ITenant;
      console.log(newTenantOne, "IM THE TENANT ONE");
      if (tenantTwo.firstName !== "") {
        const newTenantTwo = (await createTenant({
          tenancyId: newTenancy?.tenancyId as string,
          firstName: tenantTwo.firstName,
          lastName: tenantTwo.lastName,
        })) as ITenant;
        console.log(newTenantTwo, "IM THE TENANT TWO");
      }
      handleModal(null, ''); //close form
      router.replace(router.asPath); //refresh server-side props

    } else {
      alert("Missing fields are required");
    }
  };
  return (
    <form sx={{ variant: "components.form"}}>
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
        <label sx={{variant: "containers.visuallyHidden"}}>Date Established:</label>
        <input
          type="date"
          title='Date of Tenancy Establishment'
          value={tenancy.establishedDate}
          onChange={(e) =>
            setTenancy({ ...tenancy, establishedDate: e.target.value })
          }
        />
        <label sx={{variant: "containers.visuallyHidden"}}>Rent</label>
        <input
          type="number"
          placeholder="Rent"
          title="Rent"
          value={tenancyVersions.rent as number}
          onChange={(e) =>
            setTenancyVersions({ ...tenancyVersions, rent: Number(e.target.value) })
          }
        />
        <br/>
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
        <label sx={{variant: "containers.visuallyHidden"}}>Add Notes</label>
        <input
          type="text"
          placeholder="Notes..."
          value={tenancy.notes}
          onChange={(e) => setTenancy({ ...tenancy, notes: e.target.value })}
        />
        <label sx={{variant: "containers.visuallyHidden"}}>Add any related Documents</label>
        <input
          type="file"
          //value={tenancy.documents as File[]}
        />
      </section>
      <button type="submit" onClick={async (e) => await handleSubmit(e)}>
        Create Tenancy
      </button>
    </form>
  );
}
