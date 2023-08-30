import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

import Profile from "@/components/Pages/Profile";
import { getAllCommunities } from "@/services/communityService";
import { ICommunity, IUser } from "../../types/interfaces";

export default async function ProfilePage() {
  const { session, communities } = await getData();
  const user = session.user as unknown as IUser;

  return (
    <>
      <main>
        {session ? (
          <Profile user={user} communities={communities} />
        ) : (
          <div>redirecting...</div>
        )}
      </main>
    </>
  );
}

export async function getData() {
  //fetch session to validate
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log("redirecting");
    redirect(`api/auth/signin`);
  }
  const communities = (await getAllCommunities()) as ICommunity[];

  return {
    session,
    communities,
  };
}
