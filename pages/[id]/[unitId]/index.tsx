/** @jsxImportSource theme-ui */
import Navbar from "../../../src/components/Navbar/Navbar";
import { authOptions } from "../../api/auth/[...nextauth]";
import { Session, unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import {
  ICommunity,
  ITenancy,
  IUnit,
} from "../../../types/interfaces";
import { getCommunityById } from "../../../src/services/communityService";
import { getUnitById } from "../../../src/services/unitService";
import { getTenancyById } from "../../../src/services/tenancyService";
import { UnitInfo } from "../../../src/components/UnitInfo/UnitInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

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
  const router = useRouter();
  console.log(tenancy)

  return (
    <>
      {user && (
        <>
          <Navbar name={community.name} />
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
          <UnitInfo tenancy={tenancy} unit={unit} community={community}/>
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
