/** @jsxImportSource theme-ui */
import Image from "next/image";
import Brighten from "./Brighten";
import Darken from "./Darken";
import Login from "./Login";
import TabBar from "./TabBar";
import { ICommunity } from "../../types/interfaces";

type Props = {
  community: ICommunity | undefined;
  colorMode: string;
  setColorMode: (arg: string) => void;
};
function Navbar({ community, colorMode, setColorMode }: Props) {
  function handleModeChange() {
    setColorMode(colorMode === "default" ? "dark" : "default");
  }

  return (
    <>
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "fixed",
          width: "100vw",
          height: "70px",
          backgroundColor: "c",
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
          padding: "8px 20px 8px 20px",
          justifyContent: "space-between",
          zIndex: "1",
        }}
      >
        <a href={`/`}>
          <div
            sx={{
              backgroundColor: "white",
              border: "2px solid",
              borderColor: "f",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <img src="/HomesSvg.svg" alt="Logo" height={100} width={120}></img>
          </div>
        </a>
        <span>{community && community.name}</span>
        <div sx={{ display: "flex", alignItems: "center" }}>
          <div sx={{ height: 24 }} onClick={handleModeChange}>
            {colorMode === "default" ? <Darken /> : <Brighten />}
          </div>
          <Login />
        </div>
      </div>
      {community && <TabBar communityId={community.id} />}
    </>
  );
}

export default Navbar;
