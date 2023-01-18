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
  const router = useRouter();

  function handleNotes(e: React.KeyboardEvent) {
    e.preventDefault();
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
                position: "absolute",
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
                <span>No.{unit.number}</span>
                {tenancy && (
                  <>
                    <span>{`${
                      tenancy.tenants && tenancy.tenants[0].firstName
                    } ${tenancy.tenants && tenancy.tenants[0].lastName}`}</span>
                    <span>{`${
                      tenancy.tenants && tenancy.tenants[1].firstName
                    } ${tenancy.tenants && tenancy.tenants[1].lastName}`}</span>
                    <div
                      sx={{ alignSelf: "flex-end" }}
                    >{`$${tenancy.rent}`}</div>
                  </>
                )}
              </div>
              <div sx={{ border: "2px solid #3a5a40", width: "100%" }}></div>
              {tenancy && (
                <>
                  <span>Tenancy Established: {}</span>
                  <span>Next Rent Increase: </span>
                  <span>
                    Assignment Of Lease?{" "}
                    {tenancy.assignmentOfLease ? "yes" : "no"}
                  </span>

                  <textarea onChange={(e) => handleNotes}>
                    {tenancy.notes}
                  </textarea>

                  <button>View History</button>
                  <button>Add Rent Increase</button>
                </>
              )}

              <button
                sx={{ variant: "buttons.secondary" }}
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
