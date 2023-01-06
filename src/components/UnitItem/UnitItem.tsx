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
  const tenancyy = {
    tenantOne: {
      firstName: 'danielle',
      lastName: 'strosch',
    },
    tenantTwo: {
      firstName: 'danielle',
      lastName: 'strosch',
    }
  }

  return (
    <Link href="/id/unitId" as={`/${id}/${unit.id}`}>
      <div sx={{ variant: "cards.primary", position: "relative" }}>
        {tenancyy.tenantOne && (
            <p>
              {`${tenancyy.tenantOne.firstName} ${tenancyy.tenantOne.lastName}`}
            </p>
        )}
        {tenancyy.tenantTwo && (
          <p>
            {`${tenancyy.tenantTwo.firstName} ${tenancyy.tenantTwo.lastName}`}
          </p>
        )}

        <div sx={{ position: "absolute", bottom: "15px", right: "15px" }}>
          No. {unit.number}
        </div>
      </div>
    </Link>
  );
}
