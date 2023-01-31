/** @jsxImportSource theme-ui */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Menu from "../../src/components/Menu/Menu";
import UnitList from "../../src/components/UnitList/UnitList";
import Navbar from "../../src/components/Navbar/Navbar";
import { authOptions } from "../api/auth/[...nextauth]";
import { Session, unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { ICommunity, ITenancy, IUnit } from "../../types/interfaces";
import { getCommunityById } from "../../src/services/communityService";
import { getUnitList } from "../../src/services/unitService";
import { useUnitListContext } from "../../src/contexts/unitListContext";
import { getAllTenancies } from "../../src/services/tenancyService";
import { useMenuContext } from "../../src/contexts/menuContext";

type Props = {
  user: {
    email: string;
    session: Session;
    image: string;
  };
  community: ICommunity;
  unitArr: IUnit[];
  //tenancies: ITenancy[];
};
export default function Home({ user, community, unitArr }: Props) {
  const { menuToggle, setMenuToggle } = useMenuContext();
  const { unitList, setUnitList } = useUnitListContext();
  useEffect(() => {
    setUnitList(unitArr);
  }, []);

  return (
    <>
      {user && (
        <>
          <Navbar name={community.name} />
          <Menu
            communityId={community.communityId as string}
          />
          <div
            sx={{
              variant: "containers.mainPageCont",
              left: "50px",
              ...(menuToggle && {
                variant: "containers.mainPageCont",
                left: "160px",
              }),
            }}
          >
            <UnitList unitList={unitList} />
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

  const community = await getCommunityById(context.params?.id as string) as ICommunity;
  const unitArr = await getUnitList(community.communityId as string) as IUnit[];
  //const tenancies = await getAllTenancies() as ITenancy[];
  return {
    props: {
      user,
      community,
      unitArr
    },
  }
}
