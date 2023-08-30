/** @jsxImportSource theme-ui */
import {
  faCheckCircle,
  faCircleXmark,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ICommunity, ITenancy, IUnit } from "../../types/interfaces";
import { useModalContext } from "../contexts/modalContext";
import { updateNotes } from "../services/tenancyService";
import AddRentIncreaseForm from "./Forms/AddRentIncreaseForm";
import AddTenancyForm from "./Forms/AddTenancyForm";
import EditTenancyForm from "./Forms/EditTenancyForm";
// import DocumentViewer from "./DocumentViewer";

type Props = {
  unit: IUnit;
  community: ICommunity;
  currentTenancy: ITenancy | undefined;
  futureTenancy: ITenancy | undefined;
};
export function UnitInfo({
  unit,
  community,
  currentTenancy,
  futureTenancy,
}: Props) {
  let { handleModal } = useModalContext();

  const [tenancy, setTenancy] = useState<ITenancy | undefined>(currentTenancy);
  useEffect(() => {
    setTenancy(currentTenancy);
    if (!tenancy && futureTenancy) {
      setTenancy(futureTenancy);
    }
  }, [currentTenancy]);

  let defaultNotes = "";
  if (tenancy && tenancy.notes) defaultNotes = tenancy.notes as string;
  const [notesUpdate, setNotesUpdate] = useState<string>(defaultNotes);

  function handleNotes(e: React.FocusEvent) {
    e.preventDefault();
    if (notesUpdate !== tenancy?.notes) {
      updateNotes(unit.id as string, notesUpdate);
    }
  }

  return (
    <div sx={{ display: "flex", justifyContent: "center" }}>
      <section sx={{ variant: "containers.mainPageCont" }}>
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
            tenancy.tenants && tenancy.tenancyVersions && (
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
                  {tenancy.tenancyVersions[0].rent}
                </div>
              </div>
            )}
        </div>
        <div
          sx={{
            alignSelf: "center",
            border: "2px solid #3a5a40",
            borderRadius: "10px",
            width: "90%",
          }}
        ></div>
        <section
          sx={{
            height: "75vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {tenancy &&
            tenancy.tenancyVersions &&
            tenancy.tenancyVersions[0] &&
            new Date(
              tenancy.tenancyVersions[0].recordEffectiveDate as string
            ).getTime() > new Date().getTime() && (
              <h5
                sx={{ marginTop: "25px", color: "darkRed" }}
              >{`note this tenancies establishment date is in the future`}</h5>
            )}
          {tenancy &&
            tenancy.tenancyVersions &&
            tenancy.tenancyVersions.length > 0 && (
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
                      {tenancy.tenancyVersions[0].increaseDate}
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
                      <a
                        href={`/${community.id}/${unit.id}/history`}
                      >
                        <button sx={{ variant: "buttons.secondary" }}>
                          View History
                        </button>
                      </a>
                      <button
                        sx={{ variant: "buttons.secondary" }}
                        onClick={() =>
                          handleModal(
                            <AddRentIncreaseForm
                              tenancyId={tenancy?.id as string}
                              currentRecordEffectiveDate={
                                tenancy?.tenancyVersions &&
                                (tenancy?.tenancyVersions[0]
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
                <div
                  sx={{
                    display: "flex",
                    alignSelf: "flex-start",
                    marginLeft: "20px",
                  }}
                >
                  {tenancy &&
                    tenancy.documents &&
                    tenancy.documents.length > 0 && (
                      // <DocumentViewer
                      //   documents={tenancy.documents as unknown as string[]}
                      // />
                      <>documents go here</>
                    )}
                </div>
              </>
            )}
          {futureTenancy && (
            <div sx={{ color: "darkRed", marginTop: "15px" }}>
              {`A new tenancy is beginning on ${futureTenancy.establishedDate}`}
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
                <AddTenancyForm
                  unitId={unit.id as string}
                  activeTenancy={tenancy}
                />,
                "Create New Tenancy"
              )
            }
          >
            Add New Tenancy
          </button>
        </section>
      </section>
    </div>
  );
}
