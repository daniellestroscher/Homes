/** @jsxImportSource theme-ui */
import { useRouter } from 'next/router';
import Menu from '../../src/components/Menu/Menu'
import RentRoll from '../../src/components/RentRoll/RentRoll';
import Navbar from '../../src/components/Navbar/Navbar';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession, Session, unstable_getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { ICommunity, ITenancyVersions, IUnit } from '../../types/interfaces';
import { getCommunityById } from '../../src/services/communityService';
import { useMenuContext } from '../../src/contexts/menuContext';
import { getUnitListWithAllVersions } from '../../src/services/unitService';
import { getAllTenancyVersions } from '../../src/services/tenancyVersionsService';
import { useColorMode } from 'theme-ui';

type Props = {
  user: {
    email: string;
    session: Session;
    image: string;
  };
  community: ICommunity;
  unitArr: IUnit[];
  allVersions: ITenancyVersions[];
};
export default function RentRollPage({user, community, unitArr, allVersions}:Props) {
  const { menuToggle, setMenuToggle } = useMenuContext();
  const [colorMode, setColorMode] = useColorMode();

  return (
  <>
    {user && (
      <>
        <Navbar name={community.name} colorMode={colorMode} setColorMode={setColorMode}/>
        <div sx={{
          variant: 'containers.mainPageCont',
          left: '60px',
          ...(menuToggle && {
            variant: 'containers.mainPageCont',
            left: '175px'
          })
        }}>
          <Menu communityId={community.communityId as string}/>
          <RentRoll unitArr={unitArr} allVersions={allVersions} colorMode={colorMode}/>
        </div>
      </>
    )}
  </>
  )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  //fetch session to validate
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );
  console.log(session, 'session');
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
  const unitArr = await getUnitListWithAllVersions(community.communityId as string) as IUnit[];
  const allVersions = await getAllTenancyVersions();

  return {
    props: {
      user,
      community,
      unitArr,
      allVersions,
    },
  };
}

