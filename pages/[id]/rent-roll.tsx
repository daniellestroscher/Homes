/** @jsxImportSource theme-ui */
import { useRouter } from 'next/router';
import Menu from '../../src/components/Menu/Menu'
import RentRoll from '../../src/components/RentRoll/RentRoll';
import Navbar from '../../src/components/Navbar/Navbar';
import { authOptions } from '../api/auth/[...nextauth]';
import { Session, unstable_getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { ICommunity } from '../../types/interfaces';
import { getCommunityById } from '../../src/services/communityService';
import { useMenuContext } from '../../src/contexts/menuContext';

type Props = {
  user: {
    email: string;
    session: Session;
    image: string;
  };
  community: ICommunity;
};
export default function RentRollPage({user, community}:Props) {
  const { menuToggle, setMenuToggle } = useMenuContext();
  const router = useRouter();
  const { id } = router.query;
  console.log(community);
  return (
  <>
    {user && (
      <>
        <Navbar name={community.name}/>
        <div sx={{
          variant: 'containers.mainPageCont',
          left: '60px',
          ...(menuToggle && {
            variant: 'containers.mainPageCont',
            left: '175px'
          })
        }}>
          <Menu communityId={community.communityId as string}/>
          <RentRoll/>
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

  return {
    props: {
      user,
      community
    },
  };
}

