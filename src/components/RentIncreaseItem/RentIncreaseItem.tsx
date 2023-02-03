/** @jsxImportSource theme-ui */
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircle, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ITenancy, IUnit } from "../../../types/interfaces";

interface Props {
  unit: IUnit;
  tenancy: ITenancy | undefined;
  selector: boolean;
}
export default function RentIncreaseItem({ unit, tenancy, selector }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <Link
      href={selector ? "javascript:void(0)" : "/[id]/[unitId]"}
      as={selector ? "" : `/${id}/${unit.unitId}`}
    >
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
        {selector && (
          <FontAwesomeIcon
            icon={selected ? (faCircleCheck as IconProp) : faCircle}
            sx={
              selected
                ? {
                    height: "20px",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: "accent",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }
                : {
                    height: "20px",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: 'white',
                    border: "2px solid gray",
                    borderRadius: "50%",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }
            }
            onClick={() => setSelected(!selected)}
          />
        )}
        {tenancy && tenancy.tenancy_versions && (
          <div sx={{ position: "absolute", bottom: "5px", left: "5px" }}>
            <section sx={{ variant: "components.increaseSticker" }}>
              <p>
                next increase:
                <br />
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
