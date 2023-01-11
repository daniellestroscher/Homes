/** @jsxImportSource theme-ui */

import React from "react";
import { ICommunity, ITenant, IUnit } from "../../../types/interfaces";
// import { createUnit } from "../../services/unitService";

type Props = {
  community: ICommunity;
};
export default function AddTenancyForm({ community }: Props) {
  const [tenantOne, setTenantOne] = React.useState<ITenant>({
    firstName: "",
    lastName: "",
  });
  const [tenantTwo, setTenantTwo] = React.useState<ITenant>({
    firstName: "",
    lastName: "",
  });

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (tenantOne) {
      // const newUnit = await createUnit({
      //   communityId: community.id,
      //   number: unitNumber,
      // });
      // setUnitList([...unitList, newUnit]);
      // setUnitNumber(null);
      // setUnitFormToggle(!unitFormToggle);
    } else {
      alert("All fields are required");
    }
  };
  return (
    <form>
      <section>
        <h4>Add Tenants</h4>
      </section>
      <section>
        <h4>Other Info</h4>
      </section>
    </form>
  );
}
