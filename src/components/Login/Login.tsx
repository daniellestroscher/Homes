
import { signIn, useSession } from "next-auth/react"

export default function login() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <div>
    <p>
      {!session && (
        <>
          <span>
            You are not signed in
          </span>
          <a
            href={`/api/auth/signin`}
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            Sign in
          </a>
        </>
      )}
      {session?.user && (
        <>
          {session.user.image && (
            <span
              style={{ backgroundImage: `url('${session.user.image}')` }}
            />
          )}
          <span>
            <small>Signed in as</small>
            <br />
            <strong>{session.user.email ?? session.user.name}</strong>
          </span>
        </>
      )}
    </p>
  </div>
  )
}