/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../src/components/Navbar/Navbar";
import { authOptions } from "../../api/auth/[...nextauth]";
import { Session, unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { ICommunity, ITenancy, IUnit } from "../../../types/interfaces";
import { getCommunityById } from "../../../src/services/communityService";
import { getUnitById } from "../../../src/services/unitService";
import { getTenancyById } from "../../../src/services/tenancyService";
import { updateNotes } from "../../../src/services/tenancyService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useModalContext } from "../../../src/contexts/modalContext";
import AddTenancyForm from "../../../src/components/Forms/AddTenancyForm";

type Props = {
  user: {
    email: string;
    session: Session;
    image: string;
  };
  community: ICommunity;
  unit: IUnit;
  tenancy: ITenancy;
};
export default function Home({ user, community, unit, tenancy }: Props) {
  let { handleModal } = useModalContext();
  let defaultNotes = "";
  if (tenancy && tenancy.notes) defaultNotes = tenancy.notes as string;

  const [notes, setNotes] = useState<string>(defaultNotes);
  const router = useRouter();

  function handleNotes(e: React.FocusEvent) {
    e.preventDefault();
    if (notes !== tenancy.notes) {
      updateNotes(unit.unitId as string, notes);
      router.replace(router.asPath); //refresh server-side props
    }
  }

  return (
    <>
      {user && (
        <>
          <Navbar name={community.name} />
          <div sx={{ display: "flex", justifyContent: "center" }}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              sx={{
                position: "fixed",
                top: "90px",
                left: "30px",
                size: "17px",
                cursor: "pointer",
              }}
              onClick={router.back}
            />
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
                <h2>No.{unit.number}</h2>
                {tenancy && (
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
                      {`${tenancy.tenants && tenancy.tenants[1].firstName} ${
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
                      {`$${tenancy.rent}`}
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
              {tenancy && (
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
                      <p>Next Rent Increase: </p>
                      <br />
                      <p>
                        Assignment Of Lease?
                        {tenancy.assignmentOfLease ? " yes" : " no"}
                      </p>
                      <br />
                      <p>
                        Pet?
                        {tenancy.pet ? " yes" : " no"}
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
                        <button sx={{ variant: "buttons.secondary" }}>
                          View History
                        </button>
                        <button sx={{ variant: "buttons.secondary" }}>
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
                        onChange={(e) => setNotes(e.target.value)}
                        onBlur={(e) => handleNotes(e)}
                      >
                        {tenancy.notes}
                      </textarea>
                    </div>
                  </div>
                  <div sx={{ display: "flex" }}>
                    {tenancy.documents as undefined}
                  </div>
                </>
              )}

              <button
                sx={{
                  variant: "buttons.secondary",
                  alignSelf: "flex-start",
                  margin: "10px 50px",
                }}
                onClick={() =>
                  handleModal(
                    <AddTenancyForm community={community} unit={unit} />
                  )
                }
              >
                Add New Tenancy
              </button>
            </section>
          </div>
        </>
      )}
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //fetch session to validate
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (!session) {
    return {
      redirect: {
        destination: `api/auth/signin?callbackUrl=${process.env.REDIRECT_URL}`,
        permanent: false,
      },
    };
  }
  const { user } = session as any;
  const community = (await getCommunityById(
    context.params?.id as string
  )) as ICommunity;

  const unit = (await getUnitById(context.params?.unitId as string)) as IUnit;
  const tenancy = (await getTenancyById(unit.unitId as string)) as ITenancy;

  return {
    props: {
      user,
      community,
      unit,
      tenancy,
    },
  };
}
