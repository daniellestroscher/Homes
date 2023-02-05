/** @jsxImportSource theme-ui */
import {
  faArrowLeft,
  faCheckCircle,
  faCircleXmark,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ICommunity, ITenancy, IUnit } from "../../../types/interfaces";
import { useModalContext } from "../../contexts/modalContext";
import { updateNotes } from "../../services/tenancyService";
import { formatDate } from "../../utils/helperFunctions";
import AddRentIncreaseForm from "../Forms/AddRentIncreaseForm";
import AddTenancyForm from "../Forms/AddTenancyForm";
import EditTenancyForm from "../Forms/EditTenancyForm";
type Props = {
  tenancyArr: ITenancy[];
  unit: IUnit;
  community: ICommunity;
};
export function UnitInfo({ unit, community, tenancyArr }: Props) {
  let { handleModal } = useModalContext();
  // useEffect(()=> {
  //   console.log('this useeffect was called.')
  // }, [tenancyArr])

  let tenancy = tenancyArr.find((tenancy) => {
    return tenancy.activeStatus === true;
  });

  let futureTenancyAvailable = tenancyArr.find((tenancy) => {
    return (
      tenancy.establishedDate > formatDate(new Date(), "yyyy-mm-dd") &&
      tenancy.activeStatus === false
    );
  });

  if (!tenancy && futureTenancyAvailable) {
    tenancy = futureTenancyAvailable;
  }

  let defaultNotes = "";
  if (tenancy && tenancy.notes) defaultNotes = tenancy.notes as string;
  const [notesUpdate, setNotesUpdate] = useState<string>(defaultNotes);

  function handleNotes(e: React.FocusEvent) {
    e.preventDefault();
    if (notesUpdate !== tenancy?.notes) {
      updateNotes(unit.unitId as string, notesUpdate);
    }
  }

  return (
    <div sx={{ display: "flex", justifyContent: "center" }}>
      <section sx={{ variant: "containers.singlePageFormCont" }}>
        <div
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            width: "100%",
            padding: "30px",
          }}
        >
          <div
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <h2>No.{unit.number}</h2>
            <FontAwesomeIcon
              icon={faPen}
              sx={{
                size: "17px",
                cursor: "pointer",
              }}
              onClick={() =>
                handleModal(
                  <EditTenancyForm tenancy={tenancy} />,
                  "Edit Tenancy"
                )
              }
            />
          </div>
          {tenancy &&
            tenancy.tenants &&
            tenancy.tenancy_versions &&
            tenancy.tenancy_versions.length > 0 && (
              <div
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <p sx={{ fontSize: "18px", margin: "15px" }}>
                  {`${tenancy.tenants && tenancy.tenants[0].firstName} ${
                    tenancy.tenants && tenancy.tenants[0].lastName
                  }`}
                  <br />
                  {tenancy.tenants &&
                    tenancy.tenants[1] &&
                    `${tenancy.tenants && tenancy.tenants[1].firstName} ${
                      tenancy.tenants && tenancy.tenants[1].lastName
                    }`}
                </p>
                <div
                  sx={{
                    alignSelf: "flex-end",
                    fontSize: "20px",
                    margin: "10px",
                  }}
                >
                  {tenancy.tenancy_versions[0].rent}
                </div>
              </div>
            )}
        </div>
        <div
          sx={{
            border: "2px solid #3a5a40",
            borderRadius: "10px",
            width: "90%",
          }}
        ></div>
        {tenancy &&
          tenancy.tenancy_versions &&
          tenancy.tenancy_versions[0] &&
          new Date(
            tenancy.tenancy_versions[0].recordEffectiveDate as string
          ).getTime() > new Date().getTime() && (
            <h5
              sx={{ marginTop: "25px", color: "darkRed" }}
            >{`note this tenancies establishment date is in the future`}</h5>
          )}
        {tenancy &&
          tenancy.tenancy_versions &&
          tenancy.tenancy_versions.length > 0 && (
            <>
              <div
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "90%",
                  padding: "20px 30px",
                }}
              >
                <div sx={{ alignSelf: "center", margin: "20px 0px" }}>
                  <p>Tenancy Established: {tenancy.establishedDate}</p>
                  <br />
                  <p>
                    Next Rent Increase:{" "}
                    {tenancy.tenancy_versions[0].increaseDate}
                  </p>
                  <br />
                  <p>
                    Assignment Of Lease?
                    {tenancy.assignmentOfLease ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        sx={{
                          height: "17px",
                          color: "accent",
                          marginLeft: "5px",
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        sx={{
                          height: "17px",
                          color: "gray",
                          marginLeft: "5px",
                        }}
                      />
                    )}
                  </p>
                  <br />
                  <p>
                    Pet?
                    {tenancy.pet ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        sx={{
                          height: "17px",
                          color: "accent",
                          marginLeft: "5px",
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        sx={{
                          height: "17px",
                          color: "gray",
                          marginLeft: "5px",
                        }}
                      />
                    )}
                  </p>
                </div>
                <div
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <div sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Link
                      href="/[id]/[unitId]/history"
                      as={`/${community.communityId}/${unit.unitId}/history`}
                    >
                      <button sx={{ variant: "buttons.secondary" }}>
                        View History
                      </button>
                    </Link>
                    <button
                      sx={{ variant: "buttons.secondary" }}
                      onClick={() =>
                        handleModal(
                          <AddRentIncreaseForm
                            tenancyId={tenancy?.tenancyId as string}
                            currentRecordEffectiveDate={
                              tenancy?.tenancy_versions &&
                              (tenancy?.tenancy_versions[0]
                                .recordEffectiveDate as string)
                            }
                          />,
                          "Create Rent Increase"
                        )
                      }
                    >
                      Add Rent Increase
                    </button>
                  </div>
                  <textarea
                    sx={{
                      margin: "20px 0px",
                      height: "125px",
                      border: "none",
                      borderRadius: "6px",
                      padding: "10px",
                    }}
                    onChange={(e) => setNotesUpdate(e.target.value)}
                    onBlur={(e) => handleNotes(e)}
                    defaultValue={tenancy.notes}
                  ></textarea>
                </div>
              </div>
              <div sx={{ display: "flex" }}>
                {tenancy.documents as undefined}
              </div>
            </>
          )}
        {futureTenancyAvailable && (
          <div sx={{ color: "darkRed", marginTop: "15px" }}>
            {`A new tenancy in beginning on ${futureTenancyAvailable.establishedDate}`}
          </div>
        )}

        <button
          sx={{
            variant: "buttons.secondary",
            alignSelf: "flex-start",
            margin: "10px 50px",
          }}
          onClick={() =>
            handleModal(
              <AddTenancyForm unitId={unit.unitId as string} />,
              "Create New Tenancy"
            )
          }
        >
          Add New Tenancy
        </button>
      </section>
    </div>
  );
}
