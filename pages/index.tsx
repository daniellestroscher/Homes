/** @jsxImportSource theme-ui */
import Head from 'next/head'
import { useState } from 'react'
import { useSession, getSession } from "next-auth/react"
import Navbar from '../src/components/Navbar/Navbar'
import Menu from '../src/components/Menu/Menu'
import UnitList from '../src/components/UnitList/UnitList'

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import type { GetServerSidePropsContext } from "next"
import type { Session } from "next-auth"

export default function Home(user: { session: Session }) {
  // `session` will match the returned value of `callbacks.session()` from `NextAuth()`
  //const { data: session } = useSession();
  console.log(user)
  const [menuToggle, setMenuToggle] = useState<boolean>(true);

  return (
    <>
      <Head>
        <title>Homes Park Manager</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://kit.fontawesome.com/55cdc9cb8f.js" crossOrigin="anonymous"></script>
      </Head>
      <main>
        <Navbar/>
        {
          user &&
          <>
            <Menu menuToggle={menuToggle} setMenuToggle={setMenuToggle}/>
            <div sx={{
              variant: 'containers.unitListCont',
              left: '35px',
              ...(menuToggle && {
                variant: 'containers.unitListCont',
                left: '155px'
              })
            }}>
            <UnitList/>
            </div>
          </>
        }
      </main>
    </>
  )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if(!session){
    return{
        redirect:{
            destination:`api/auth/signin?callbackUrl=${ process.env.REDIRECT_URL }`,
            permanent: false,
        }
    }
  }
  else {
    const {user} = session as any;
    return {
      props: user
    }
  }
}
