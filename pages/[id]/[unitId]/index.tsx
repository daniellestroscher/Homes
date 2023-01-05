/** @jsxImportSource theme-ui */
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../../src/components/Navbar/Navbar";
import { authOptions } from "../../api/auth/[...nextauth]";
import { Session, unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { ICommunity } from "../../../types/interfaces";
import { getCommunityById } from "../../../src/services/communityService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type Props = {
  user: {
    email: string;
    session: Session;
    image: string;
  };
  community: ICommunity;
};
export default function Home({ user, community }: Props) {
  const [menuToggle, setMenuToggle] = useState<boolean>(true);
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {user && (
        <>
          <Navbar name={community.name} />
          <div sx={{ display: "flex", justifyContent: "center" }}>
            <section sx={{ variant: "containers.singlePageFormCont" }}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                sx={{ position: "absolute", top: "40px", left: '30px', size: "17px", cursor: 'pointer'}}
                onClick={router.back}
              />
            </section>
          </div>
          //add form here
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
  const res = await getCommunityById(context.params?.id as string);
  const community = res[0];

  return {
    props: {
      user,
      community,
    },
  };
}