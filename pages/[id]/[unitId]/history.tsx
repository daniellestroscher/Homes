/** @jsxImportSource theme-ui */
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import Menu from "../../../src/components/Menu/Menu";
import Navbar from "../../../src/components/Navbar/Navbar";
import { UnitHistory } from "../../../src/components/UnitHistory/UnitHistory";
import { getCommunityById } from "../../../src/services/communityService";
import { getTenancyById } from "../../../src/services/tenancyService";
import { getUnitById } from "../../../src/services/unitService";
import { ICommunity, ITenancy, IUnit } from "../../../types/interfaces";
import { authOptions } from "../../api/auth/[...nextauth]";

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

export default function History({ user, community, unit, tenancy }: Props) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {user && (
        <>
          <Navbar name={undefined} />
          {/* <Menu communityId={id as string}/> */}
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
          <UnitHistory />
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
  const { user } = session as Session;
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
