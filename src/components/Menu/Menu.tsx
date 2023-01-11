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
import { useModalContext } from "../../contexts/modalContext";
import AddUnitForm from "../Forms/AddUnitForm";
import { useUnitListContext } from "../../contexts/unitListContext";

type props = {
  menuToggle: boolean;
  setMenuToggle: (arg: boolean) => void;
  communityId: string;
};
function Menu({ menuToggle, setMenuToggle, communityId }: props) {
  const { handleModal } = useModalContext();
  const { unitList, setUnitList } = useUnitListContext();
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
          <Link href="/[id]" as={`/${communityId}`}>
            <div sx={{ variant: "components.listItem" }}>
              <FontAwesomeIcon
                icon={faHouse as IconProp}
                sx={{ size: "17px" }}
              />
              <li>Home</li>
            </div>
          </Link>
          <Link href="/[id]/rent-increase" as={`/${communityId}/rent-increase`}>
            <div sx={{ variant: "components.listItem" }}>
              <FontAwesomeIcon
                icon={faMoneyBillTrendUp as IconProp}
                sx={{ size: "17px" }}
              />
              <li>Rent Increases</li>
            </div>
          </Link>
          <Link href="/[id]/rent-roll" as={`/${communityId}/rent-roll`}>
            <div sx={{ variant: "components.listItem" }}>
              <FontAwesomeIcon
                icon={faChartSimple as IconProp}
                sx={{ size: "17px" }}
              />
              <li>Rent Roll</li>
            </div>
          </Link>
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
                />
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
