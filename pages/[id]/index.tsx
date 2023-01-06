/** @jsxImportSource theme-ui */
import { useState } from "react";
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
import AddUnitForm from "../../src/components/AddUnitForm/AddUnitForm";

type Props = {
  user: {
    email: string;
    session: Session;
    image: string;
  };
  community: ICommunity;
  unitArr: IUnit[];
  tenancy: ITenancy;
};
export default function Home({ user, community, unitArr, tenancy }: Props) {
  const [menuToggle, setMenuToggle] = useState<boolean>(true);
  const [unitFormToggle, setUnitFormToggle] = useState<boolean>(false);
  const [unitList, setUnitList] = useState<IUnit[]>(unitArr);
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {user && (
        <>
          <Navbar name={community.name} />
          <Menu
            menuToggle={menuToggle}
            setMenuToggle={setMenuToggle}
            unitFormToggle={unitFormToggle}
            setUnitFormToggle={setUnitFormToggle}
            communityId={id as string}
          />
          <div
            sx={{
              variant: "containers.mainPageCont",
              left: "35px",
              ...(menuToggle && {
                variant: "containers.mainPageCont",
                left: "155px",
              }),
            }}
          >
            <UnitList tenancy={tenancy} unitList={unitList} />
            <AddUnitForm
              unitFormToggle={unitFormToggle}
              setUnitFormToggle={setUnitFormToggle}
              community={community}
              unitList={unitList}
              setUnitList={setUnitList}
            />
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
  //fetch community
  const communityArr = await getCommunityById(context.params?.id as string);
  const community = communityArr[0];
  //fetch unitList for community
  const unitArr = await getUnitList(community.id as string);
  console.log(unitArr);

  return {
    props: {
      user,
      community,
      unitArr,
    },
  };
}