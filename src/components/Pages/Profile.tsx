/** @jsxImportSource theme-ui */
"use client";

import Image from "next/image";
import { Session } from "next-auth";
import { useState } from "react";
import { useModalContext } from "@/contexts/modalContext";
import { ICommunity } from "../../../types/interfaces";

import AddCommunityForm from "../Forms/AddCommunityForm";
import CommunityCardList from "../CommunityCardList";
import Navbar from "../Navbar";
import { useColorMode } from "theme-ui";

type Props = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  communities: ICommunity[];
};
export default function Profile({ user, communities }: Props) {
  console.log(user);
  const [communityList, setCommunityList] = useState<ICommunity[]>(communities);
  const { handleModal } = useModalContext();
  const [colorMode, setColorMode] = useColorMode();

  let profilePic;
  if (user.image) {
    profilePic = user.image.replace(/96/, "400");
  } else {
    profilePic = "";
  }

  return (
    <>
      <Navbar
        community={undefined}
        colorMode={colorMode}
        setColorMode={setColorMode}
      />
      <div sx={{ display: "flex", justifyContent: "center" }}>
        <section
          sx={{
            variant: "containers.mainPageCont",
          }}
        >
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              alignSelf: "center",
              width: "500px",
              gap: "50px",
              padding: "20px",
              backgroundColor: "b",
              borderRadius: "10px",
              margin: "10px",
            }}
          >
            <span
              sx={{
                variant: "containers.pictureBox",
                height: "175px",
              }}
            >
              <img
                src={profilePic}
                alt="profile pic"
                width={175}
                height={175}
                sx={{ objectFit: "cover", alignSelf: "center" }}
              />
            </span>
            <h4 sx={{ color: "text" }}>{user.email}</h4>
          </div>
          <div
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              padding: "20px",
            }}
          >
            <h4 sx={{ color: "text" }}>My Communities:</h4>
            <button
              sx={{ variant: "buttons.primary" }}
              onClick={() =>
                handleModal(
                  <AddCommunityForm
                    communityList={communityList}
                    setCommunityList={setCommunityList}
                  />,
                  "Add a Community!"
                )
              }
            >
              Add
            </button>
          </div>
          <CommunityCardList communityList={communityList} />
        </section>
      </div>
    </>
  );
}
