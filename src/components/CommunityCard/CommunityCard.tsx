/** @jsxImportSource theme-ui */
import { ICommunity } from "../../../types/interfaces";
import Link from "next/link";

interface Props {
  card: ICommunity;
}
export default function CommintyCard({ card }: Props) {
  return (
    <Link href="/id/home" as={`/${card.id}/home`}>
      <div
        sx={{
          variant: "cards.communityCard",
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          alignSelf: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        <h3>{card.name}</h3>
        <h4>{card.address}</h4>
      </div>
    </Link>
  );
}
