/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleRight,
  faCircleLeft,
  faHouse,
  faMoneyBillTrendUp,
  faChartSimple,
  faPlus,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
type props = {
  menuToggle: boolean;
  setMenuToggle: (arg: boolean) => void;
};
function Menu({ menuToggle, setMenuToggle }: props) {
  return (
    <>
      <FontAwesomeIcon
        icon={
          !menuToggle ? (faCircleRight as IconProp) : (faCircleLeft as IconProp)
        }
        onClick={() => setMenuToggle(!menuToggle)}
        sx={{
          cursor: "pointer",
          height: "20px",
          position: "fixed",
          top: "72px",
          left: "11px",
          zIndex: "1",
          color: "text",
          ...(menuToggle && {
            left: "130px",
          }),
        }}
      />
      <div
        sx={{
          variant: "components.menu",
          ...(!menuToggle && {
            variant: "components.menu",
            width: "35px",
            li: {
              display: "none",
            },
          }),
        }}
      >
        <ul sx={{ listStyle: "none", marginTop: "65px" }}>
          <Link href="">
            <div sx={{ variant: "components.listItem" }}>
              <FontAwesomeIcon icon={faHouse as IconProp} />
              <li>Home</li>
            </div>
          </Link>
          <Link href="">
            <div sx={{ variant: "components.listItem" }}>
              <FontAwesomeIcon icon={faMoneyBillTrendUp as IconProp} />
              <li>Rent Increases</li>
            </div>
          </Link>
          <Link href="">
            <div sx={{ variant: "components.listItem" }}>
              <FontAwesomeIcon icon={faChartSimple as IconProp} />
              <li>Rent Roll</li>
            </div>
          </Link>
        </ul>

        <ul sx={{ listStyle: "none", marginTop: "300px" }}>
          <Link href="">
            <div sx={{ variant: "components.listItem" }}>
              <FontAwesomeIcon icon={faPlus as IconProp} />
              <li>Add Unit</li>
            </div>
          </Link>
          <a
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            <div sx={{ variant: "components.listItem" }}>
              <FontAwesomeIcon icon={faArrowRightFromBracket as IconProp} />
              <li>Logout</li>
            </div>
          </a>
        </ul>
      </div>
    </>
  );
}
export default Menu;
