/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ITenancy, IUnit } from "../../types/interfaces";
import IncreaseAll from "./increaseAllReview";
import RentIncreaseItem from "./RentIncreaseItem";
import { useModalContext } from "../contexts/modalContext";

type Props = {
  sendTheseIncreases: IUnit[];
  //visibility: boolean;
  //setVisibility: (arg: boolean) => void;
};

export default function IncreaseBox({ sendTheseIncreases }: Props) {
  const [visibility, setVisibility] = useState<boolean>(true);
  const { handleModal } = useModalContext();

  return (
    <>
      {visibility ? (
        <div sx={{ variant: "containers.increasesBox" }}>
          <section sx={{ display: "flex", gap: "10px" }}>
            <FontAwesomeIcon
              icon={faEyeSlash as IconProp}
              sx={{ height: "13px", cursor: "pointer" }}
              onClick={() => setVisibility(!visibility)}
            />
            <h5>Increases to send this month:</h5>
          </section>
          {sendTheseIncreases.length > 0 ? (
            <section sx={{ variant: "containers.unitList" }}>
              {sendTheseIncreases &&
                sendTheseIncreases.map((unit: IUnit, i) => {
                  return (
                    <RentIncreaseItem
                      key={i + 1}
                      unit={unit}
                      tenancy={
                        unit.tenancies && (unit.tenancies[0] as ITenancy)
                      }
                      selector={true}
                    />
                  );
                })}
            </section>
          ) : (
            <div sx={{ alignSelf: "center" }}>no due increases found.</div>
          )}
          <button
            sx={{
              variant: "buttons.secondary",
              marginTop: "10px",
              width: "100px",
            }}
            onClick={() =>
              handleModal(
                <IncreaseAll unitList={sendTheseIncreases} />,
                "Do you want to increase the following rents?"
              )
            }
          >
            Increase all
          </button>
        </div>
      ) : (
        <div sx={{ margin: "10px" }}>
          <button
            sx={{ variant: "buttons.secondary" }}
            onClick={() => setVisibility(!visibility)}
          >
            Show due increases
          </button>
        </div>
      )}
    </>
  );
}
