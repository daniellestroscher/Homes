/** @jsxImportSource theme-ui */
import Link from "next/link";
import { useRouter } from "next/router";
import { ITenancy, IUnit } from "../../../types/interfaces";

interface Props {
  unit: IUnit;
  tenancy: ITenancy | undefined;
}
export default function RentIncreaseItem({ unit, tenancy }: Props) {
  const router = useRouter();
  const { id } = router.query;

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
        {tenancy && tenancy.tenancy_versions && (
          <div sx={{ position: "absolute", bottom: "5px", left: "5px" }}>
            <section sx={{variant: "components.increaseSticker"}}>
              <p>
                next increase:
                <br/>
                {tenancy?.tenancy_versions[0].increaseDate}
              </p>
            </section>
          </div>
        )}
        <div sx={{ position: "absolute", bottom: "15px", right: "15px" }}>
          No. {unit.number}
        </div>
      </div>
    </Link>
  );
}
