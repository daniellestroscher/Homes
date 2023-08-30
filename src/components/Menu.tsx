/** @jsxImportSource theme-ui */
import React, { useContext, useState } from "react";

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
import { useModalContext } from "../contexts/modalContext";
import AddUnitForm from "./Forms/AddUnitForm";
import { useUnitListContext } from "../contexts/unitListContext";
import { useMenuContext } from "../contexts/menuContext";
import { useRouter } from "next/router";

type props = {
  communityId: string;
};
function Menu({ communityId }: props) {
  const { handleModal } = useModalContext();
  const router = useRouter();
  const { menuToggle, setMenuToggle } = useMenuContext();
  const { unitList, setUnitList } = useUnitListContext();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          top: "85px",
          left: "17px",
          zIndex: "1",
          color: "text",
          ...(menuToggle && {
            left: "138px",
          }),
        }}
      />
      <div
        sx={{
          variant: "components.menu",
          ...(!menuToggle && {
            variant: "components.menu",
            width: "50px",
            li: {
              display: "none",
            },
          }),
        }}
      >
        <ul sx={{ listStyle: "none", marginTop: "65px" }}>
          <a href={`/${communityId}`}>
            <div
              sx={{
                variant: "components.listItem",
                ...(router.asPath === `/${communityId}` && { color: "accent" }),
              }}
            >
              <FontAwesomeIcon
                icon={faHouse as IconProp}
                sx={{ size: "17px" }}
              />
              <li>Home</li>
            </div>
          </a>
          <a href={`/${communityId}/rent-increase`}>
            <div
              sx={{
                variant: "components.listItem",
                ...(router.asPath === `/${communityId}/rent-increase` && {
                  color: "accent",
                }),
              }}
            >
              <FontAwesomeIcon
                icon={faMoneyBillTrendUp as IconProp}
                sx={{ size: "17px" }}
              />
              <li>Rent Increases</li>
            </div>
          </a>
          <a href={`/${communityId}/rent-roll`}>
            <div
              sx={{
                variant: "components.listItem",
                ...(router.asPath === `/${communityId}/rent-roll` && {
                  color: "accent",
                }),
              }}
            >
              <FontAwesomeIcon
                icon={faChartSimple as IconProp}
                sx={{ size: "17px" }}
              />
              <li>Rent Roll</li>
            </div>
          </a>
        </ul>

        <ul sx={{ listStyle: "none", marginTop: "300px" }}>
          <div
            sx={{ variant: "components.listItem", cursor: "pointer" }}
            onClick={() =>
              handleModal(
                <AddUnitForm
                  communityId={communityId}
                  unitList={unitList}
                  setUnitList={setUnitList}
                />,
                "Add a Unit!"
              )
            }
          >
            <FontAwesomeIcon icon={faPlus as IconProp} sx={{ size: "17px" }} />
            <li>Add Unit</li>
          </div>

          <a
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            <div sx={{ variant: "components.listItem" }}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket as IconProp}
                sx={{ size: "17px" }}
              />
              <li>Logout</li>
            </div>
          </a>
        </ul>
      </div>
    </>
  );
}
export default Menu;
