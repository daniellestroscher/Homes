/** @jsxImportSource theme-ui */
import { useRouter } from 'next/router';
import Menu from '../../src/components/Menu/Menu'
import RentIncreaseList from '../../src/components/RentIncreaseList/RentIncreaseList'
import Navbar from '../../src/components/Navbar/Navbar';
import { authOptions } from '../api/auth/[...nextauth]';
import { Session, unstable_getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { ICommunity, IUnit } from '../../types/interfaces';
import { getCommunityById } from '../../src/services/communityService';
import { useMenuContext } from '../../src/contexts/menuContext';
import { useUnitListContext } from '../../src/contexts/unitListContext';
import { getUnitList } from '../../src/services/unitService';
import { useEffect } from 'react';

type Props = {
  user: {
    email: string;
    session: Session;
    image: string;
  };
  community: ICommunity;
  unitArr: IUnit[];
};
export default function RentIncreasesPage({user, community, unitArr}:Props) {
  const { menuToggle, setMenuToggle } = useMenuContext();
  const { unitList, setUnitList } = useUnitListContext();
  useEffect(()=>{
    setUnitList(unitArr);
  }, [])

  return (
  <>
    {user && (
      <>
        <Navbar name={community.name}/>
        <div sx={{
          variant: 'containers.mainPageCont',
          left: '35px',
          ...(menuToggle && {
            variant: 'containers.mainPageCont',
            left: '155px'
          })
        }}>
        <Menu communityId={community.communityId as string}/>
        <RentIncreaseList unitList={unitList}/>
        </div>
      </>
    )}
  </>
  )
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

  return {
    props: {
      user,
      community,
      unitArr,
    },
  };
}

