/** @jsxImportSource theme-ui */
import Link from "next/link";
import { useRouter } from "next/router";
import { ITenancy, IUnit } from "../../../types/interfaces";

interface Props {
  unit: IUnit;
  tenancies: ITenancy[] | undefined;
}
export default function UnitItem({ unit, tenancies }: Props) {
  const router = useRouter();
  const { id } = router.query;
  console.log(tenancies);
  let tenancy;
  if (tenancies) tenancy = tenancies[0];
  let tenancyUpcoming;
  if (tenancies && tenancies[1]) tenancyUpcoming = tenancies[1];

  return (
    <Link href="/[id]/[unitId]" as={`/${id}/${unit.unitId}`}>
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
          <>
            <h6 sx={{position: 'absolute', bottom: '5px', color: 'darkRed'}}>This tenancy is not yet established.</h6>
          </>
        )}
        <div sx={{ position: "absolute", bottom: "15px", right: "15px" }}>
          No. {unit.number}
        </div>
      </div>
    </Link>
  );
}
