/** @jsxImportSource theme-ui */
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

type Props = {};
export default function login({}: Props) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  return (
    <div>
      {status == "unauthenticated" && (
        <div
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
            marginLeft: "5px",
            gap: "10px",
          }}
        >
          <FontAwesomeIcon
            icon={faUser as IconProp}
            sx={{ height: "22px", cursor: "pointer", color: "text" }}
          />
          <span>
            <small>You are not signed in</small>
            <br />
            <a
              sx={{ color: "text" }}
              href={`/api/auth/signin`}
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign in
            </a>
          </span>
        </div>
      )}
      {session?.user && (
        <div
          sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}
        >
          {session.user.image && (
            <span
              sx={{
                variant: "containers.pictureBox",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={() => router.push("/")}
            >
              <img
                sx={{ objectFit: "cover", alignSelf: "center" }}
                src={session.user.image}
                alt={"profile pic"}
                width={35}
                height={35}
              />
            </span>
          )}
          <span>
            <small sx={{ color: "text" }}>Signed in as</small>
            <br />
            <strong sx={{ color: "text" }}>
              {session.user.email ?? session.user.name}
            </strong>
          </span>
          <a
            sx={{ color: "text" }}
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </a>
        </div>
      )}
    </div>
  );
}
