/** @jsxImportSource theme-ui */
import Image from "next/image";
import Brighten from "../Brighten";
import Darken from "../Darken";
import Login from "../Login/Login";

type Props = {
  name: string | undefined;
  colorMode: string;
  setColorMode: (arg:string) => void;
};
function Navbar({ name, colorMode, setColorMode }: Props) {
  function handleModeChange() {
    setColorMode(colorMode === "default" ? "dark" : "default");
  }

  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "fixed",
        width: "100vw",
        height: "70px",
        backgroundColor: "background",
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
        padding: "8px 20px 8px 20px",
        justifyContent: "space-between",
        zIndex: "1",
      }}
    >
      <Image
        src="/logoPlain.png"
        alt="Logo"
        height={40}
        width={120}
        priority={true}
      ></Image>
      <span>{name && name}</span>
      <div sx={{ display: "flex", alignItems: "center" }}>
        <div sx={{ height: 24 }} onClick={handleModeChange}>
          {colorMode === "default" ? <Darken /> : <Brighten />}
        </div>
        <Login />
      </div>
    </div>
  );
}

export default Navbar;
