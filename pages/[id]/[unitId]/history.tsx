import { useRouter } from "next/router";
import Menu from "../../../src/components/Menu/Menu";
import Navbar from "../../../src/components/Navbar/Navbar";
import { UnitHistory } from "../../../src/components/UnitHistory/UnitHistory";

export default function History(){
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  return (
    <>
      <Navbar name={undefined}/>
      <Menu communityId={id as string}/>
      <UnitHistory/>
    </>
  )
}