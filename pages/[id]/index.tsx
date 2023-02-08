/** @jsxImportSource theme-ui */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Menu from "../../src/components/Menu/Menu";
import UnitList from "../../src/components/UnitList/UnitList";
import Navbar from "../../src/components/Navbar/Navbar";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession, Session, unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { ICommunity, ITenancy, IUnit } from "../../types/interfaces";
import { getCommunityById } from "../../src/services/communityService";
import { getUnitList } from "../../src/services/unitService";
import { useUnitListContext } from "../../src/contexts/unitListContext";
import { getAllTenancies } from "../../src/services/tenancyService";
import { useMenuContext } from "../../src/contexts/menuContext";
import { useColorMode } from "theme-ui";
import SearchBar from "../../src/components/searchBar/searchBar";
import { addTenanciesToUnitArr, filterUnits } from "../../src/utils/helperFunctions";

type Props = {
  user: {
    email: string;
    session: Session;
    image: string;
  };
  community: ICommunity;
  unitArr: IUnit[];
  tenancyArr: ITenancy[]
};
export default function Home({ user, community, unitArr, tenancyArr }: Props) {
  const { menuToggle, setMenuToggle } = useMenuContext();
  const { unitList, setUnitList } = useUnitListContext();
  const [colorMode, setColorMode] = useColorMode();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setUnitList(unitArr);
  }, [tenancyArr, unitArr]);

  addTenanciesToUnitArr(unitList, tenancyArr)

  const filteredUnits = filterUnits(unitList, searchQuery);

  return (
    <>
      {user && (
        <>
          <Navbar name={community.name} colorMode={colorMode} setColorMode={setColorMode} />
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
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <div>
              <div sx={{height: '40px'}}></div>
              <UnitList unitList={filteredUnits}/>
            </div>
          </div>
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

  const community = await getCommunityById(context.params?.id as string) as ICommunity;
  const unitArr = await getUnitList(community.communityId as string) as IUnit[];
  const tenancyArr = await getAllTenancies() as ITenancy[];
  return {
    props: {
      user,
      community,
      unitArr,
      tenancyArr
    },
  }
}
