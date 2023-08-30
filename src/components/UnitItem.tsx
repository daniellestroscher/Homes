/** @jsxImportSource theme-ui */

import { ICommunity, ITenancy, IUnit } from "../../types/interfaces";

interface Props {
  unit: IUnit;
  tenancies: ITenancy[] | undefined;
  community: ICommunity;
}
export default function UnitItem({ unit, tenancies, community }: Props) {
  const { id } = community;
  let tenancy;
  if (tenancies) tenancy = tenancies[0];
  let tenancyUpcoming;
  if (tenancies && tenancies[1]) tenancyUpcoming = tenancies[1];

  console.log(tenancies, "tenancy HEREE");

  return (
    <a href={`/${id}/${unit.id}/unitInfo`}>
      <div sx={{ variant: "cards.primary", position: "relative" }}>
        {tenancy && tenancy.tenants && (
          <>
            <p>
              {`${tenancy.tenants[0].firstName} ${tenancy.tenants[0].lastName}`}
            </p>
            {tenancy.tenants && tenancy.tenants[1] && (
              <p>
                {`${tenancy.tenants[1]?.firstName} ${tenancy.tenants[1]?.lastName}`}
              </p>
            )}
          </>
        )}
        {tenancy?.activeStatus === false && (
          <h6 sx={{ position: "absolute", bottom: "5px", color: "darkRed" }}>
            This tenancy <br />
            is not yet established.
          </h6>
        )}
        <div sx={{ position: "absolute", bottom: "15px", right: "15px" }}>
          No. {unit.number}
        </div>
      </div>
    </a>
  );
}
