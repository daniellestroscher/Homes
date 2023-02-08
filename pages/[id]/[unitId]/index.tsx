/** @jsxImportSource theme-ui */
import Navbar from "../../../src/components/Navbar/Navbar";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession, Session } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { ICommunity, ITenancy, IUnit } from "../../../types/interfaces";
import { getCommunityById } from "../../../src/services/communityService";
import { getUnitById } from "../../../src/services/unitService";
import {
  changeTenancyStatus,
  getTenanciesById,
} from "../../../src/services/tenancyService";
import { UnitInfo } from "../../../src/components/UnitInfo/UnitInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useColorMode } from "theme-ui";
import { update } from "lodash";
import { useEffect } from "react";
import { formatDate } from "../../../src/utils/helperFunctions";

type Props = {
  user: {
    email: string;
    session: Session;
    image: string;
  };
  community: ICommunity;
  unit: IUnit;
  tenancyArr: ITenancy[];
};
export default function Home({ user, community, unit, tenancyArr }: Props) {
  const router = useRouter();
  const [colorMode, setColorMode] = useColorMode();
  useEffect(()=>{
    if (establishedTenancies.length) {
      console.log('there are established tenancies')
      changeStatus();
    }
  }, [tenancyArr]);

  let establishedTenancies = tenancyArr.map((tenancy)=>{
    if (new Date(tenancy.establishedDate).getTime() <= new Date().getTime()) {
      return tenancy;
    }
  }).filter((x)=>x);

  let currentTenancy: ITenancy | undefined;
  if(establishedTenancies.length) {
    currentTenancy = establishedTenancies.reduce((prev, curr) => {
     return (new Date(prev?.establishedDate as string).getTime() > new Date(curr?.establishedDate as string).getTime()) ?
     prev : curr;
    })
  } else {
    currentTenancy = undefined;
  }
  let futureTenancyAvailable = tenancyArr.find((tenancy) => {
    return (
      tenancy.establishedDate > formatDate(new Date(), "yyyy-mm-dd") &&
      tenancy.activeStatus === false
    );
  });

  async function changeStatus() {
    if (currentTenancy?.previousTenancy !== null && currentTenancy?.activeStatus === false) {
      let prevTenancyId = currentTenancy?.previousTenancy;
      let currTenancyId = currentTenancy?.tenancyId;
      const statusOne = await changeTenancyStatus(unit.unitId as string, prevTenancyId, false);
      const statusTwo = await changeTenancyStatus(unit.unitId as string, currTenancyId, true);
      console.log(statusOne, statusTwo)
    } else if (currentTenancy?.previousTenancy === null && currentTenancy?.activeStatus === false) {
      let tenancyId = currentTenancy.tenancyId;
      const status = await changeTenancyStatus(unit.unitId as string, tenancyId, true);
      console.log(status, "THE STATUS")
    }
  }

  return (
    <>
      {user && (
        <>
          <Navbar
            name={community.name}
            colorMode={colorMode}
            setColorMode={setColorMode}
          />
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
          <UnitInfo currentTenancy={currentTenancy} futureTenancy={futureTenancyAvailable} unit={unit} community={community} />
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
  const { user } = session as any;
  const community = (await getCommunityById(
    context.params?.id as string
  )) as ICommunity;

  const unit = (await getUnitById(context.params?.unitId as string)) as IUnit;
  const tenancyArr = (await getTenanciesById(
    unit.unitId as string
  )) as ITenancy[];

  return {
    props: {
      user,
      community,
      unit,
      tenancyArr,
    },
  };
}
