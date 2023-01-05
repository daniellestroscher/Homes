/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { useRouter } from 'next/router';
import Menu from '../../../src/components/Menu/Menu'
import UnitList from '../../../src/components/UnitList/UnitList'
import Navbar from '../../../src/components/Navbar/Navbar';
import { authOptions } from '../../api/auth/[...nextauth]';
import { Session, unstable_getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { ICommunity } from '../../../types/interfaces';
import { getCommunityById } from '../../../src/services/communityService';

type Props = {
  user: {
    email: string;
    session: Session;
    image: string;
  };
  community: ICommunity;
};
export default function Home({user, community}:Props) {
  const [menuToggle, setMenuToggle] = useState<boolean>(true);
  const router = useRouter();
  const { id } = router.query;
  console.log(community);
  return (
  <>
    {user && (
      <>
        <Navbar name={community.name}/>
        <Menu menuToggle={menuToggle} setMenuToggle={setMenuToggle} communityId={id as string}/>
        <div sx={{
          variant: 'containers.mainPageCont',
          left: '35px',
          ...(menuToggle && {
            variant: 'containers.mainPageCont',
            left: '155px'
          })
        }}>
        <UnitList/>
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
  const res = await getCommunityById(context.params?.id as string);
  const community = res[0];

  return {
    props: {
      user,
      community
    },
  };
}

