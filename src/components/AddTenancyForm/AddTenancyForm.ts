// /** @jsxImportSource theme-ui */
// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ICommunity, IUnit } from "../../../types/interfaces";
// import { createUnit } from "../../services/unitService";

 type Props = {
   community: ICommunity;
//   unitFormToggle: boolean;
//   setUnitFormToggle: (arg: boolean) => void;
//   unitList: IUnit[];
//   setUnitList: (arg: IUnit[]) => void;
 };
export default function AddTenancyForm({
   community,
//   unitFormToggle,
//   setUnitFormToggle,
//   unitList,
//   setUnitList,
}: Props) {
//   const [unitNumber, setUnitNumber] = useState<number | null>();

//   const handleSubmit = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (unitNumber) {
//       const newUnit = await createUnit({
//         communityId: community.id,
//         number: unitNumber,
//       });
//       setUnitList([...unitList, newUnit]);
//       setUnitNumber(null);
//       setUnitFormToggle(!unitFormToggle);
//     } else {
//       alert("All fields are required");
//     }
//   };

//   return unitFormToggle ? (
//     <section sx={{ variant: "components.popup" }}>
//       <form
//         sx={{ variant: "components.form", position: "absolute", top: "75px" }}
//       >
//         <FontAwesomeIcon
//           icon={faXmark as IconProp}
//           sx={{ alignSelf: "flex-end", size: "40px", padding: "10px" }}
//           onClick={() => setUnitFormToggle(!unitFormToggle)}
//         />
//         <input
//           value={unitNumber as number}
//           type="number"
//           onChange={(e) => setUnitNumber(Number(e.target.value))}
//           placeholder="Unit Number"
//         ></input>

//         <button onClick={async (e) => await handleSubmit(e)}>Add Unit</button>
//       </form>
//     </section>
//   ) : (
//     <></>
//   );
}