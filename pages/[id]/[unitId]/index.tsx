/** @jsxImportSource theme-ui */
import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../src/components/Navbar/Navbar";
import { authOptions } from "../../api/auth/[...nextauth]";
import { Session, unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { ICommunity, IUnit } from "../../../types/interfaces";
import { getCommunityById } from "../../../src/services/communityService";
import { getUnitById } from "../../../src/services/unitService";
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
};
export default function Home({ user, community, unit }: Props) {
  let { handleModal } = useModalContext();

  const [menuToggle, setMenuToggle] = useState<boolean>(true);
  const router = useRouter();
  const { unitId } = router.query;

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
                {/* <span>{tenancy ? tenancy.tenantOne.firstName}</span> */}
                {/* <span>{tenancy ? tenancy.tenantOne.firstName}</span> */}
                <div sx={{ alignSelf: "flex-end" }}>399.65</div>
              </div>
              <div sx={{ border: "2px solid #3a5a40", width: "100%" }}></div>

              <button
                sx={{ variant: "buttons.secondary" }}
                onClick={() =>
                  handleModal(<AddTenancyForm community={community} unit={unit} />)
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
  const [community] = await getCommunityById(context.params?.id as string) as ICommunity[];
  console.log('heyyyyyyyyyyyyyy', community)
  const [unit] = await getUnitById(context.params?.unitId as string) as IUnit[];

  return {
    props: {
      user,
      community,
      unit,
    },
  };
}
