/** @jsxImportSource theme-ui */
import Link from "next/link";
import { useRouter } from "next/router";
import { ITenancy, IUnit } from "../../../types/interfaces";

interface Props {
  unit: IUnit;
  tenancy: ITenancy;
}
export default function UnitItem({ unit, tenancy }: Props) {
  const router = useRouter();
  const { id } = router.query;
  console.log(tenancy)

  return (
    <Link href="/[id]/[unitId]" as={`/${id}/${unit.unitId}`}>
      <div sx={{ variant: "cards.primary", position: "relative" }}>
        {tenancy && tenancy.tenants && (
          <>
            <p>
              {`${tenancy.tenants[0].firstName} ${tenancy.tenants[0].lastName}`}
            </p>
            <p>
            {`${tenancy.tenants[1]?.firstName} ${tenancy.tenants[1]?.lastName}`}
            </p>
          </>
        )}
        <div sx={{ position: "absolute", bottom: "15px", right: "15px" }}>
          No. {unit.number}
        </div>
      </div>
    </Link>
  );
}
