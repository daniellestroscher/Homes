/** @jsxImportSource theme-ui */
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSidePropsContext } from "next";
import { getServerSession, Session } from "next-auth";
import { useRouter } from "next/router";
import { useColorMode } from "theme-ui";
import Menu from "../../../src/components/Menu/Menu";
import Navbar from "../../../src/components/Navbar/Navbar";
import { UnitHistory } from "../../../src/components/UnitHistory/UnitHistory";
import { getCommunityById } from "../../../src/services/communityService";
import { getTenanciesById, getTenanciesByIdWithAllVersions } from "../../../src/services/tenancyService";
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
  tenancyArrWithAllVersions: ITenancy[];
};

export default function History({ user, unit, tenancyArrWithAllVersions }: Props) {
  const router = useRouter();
  const [colorMode, setColorMode] = useColorMode();

  return (
    <>
      {user && (
        <>
          <Navbar name={undefined} colorMode={colorMode} setColorMode={setColorMode} />
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
          <UnitHistory unit={unit} tenancyArr={tenancyArrWithAllVersions} />
        </>
      )}
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //fetch session to validate
  const session = await getServerSession(
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
  // const community = (await getCommunityById(
  //   context.params?.id as string
  // )) as ICommunity;

  const unit = (await getUnitById(context.params?.unitId as string)) as IUnit;
  const tenancyArrWithAllVersions = (await getTenanciesByIdWithAllVersions(unit.unitId as string)) as ITenancy[];

  return {
    props: {
      user,
      unit,
      tenancyArrWithAllVersions,
    },
  };
}
