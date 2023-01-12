/** @jsxImportSource theme-ui */
import { ICommunity } from "../../../types/interfaces";
import Link from "next/link";

interface Props {
  card: ICommunity;
}
export default function CommintyCard({ card }: Props) {
  return (
    <Link href="/id" as={`/${card.communityId}`}>
      <div
        sx={{
          variant: "cards.communityCard",
          backgroundImage: `url('${card.image}')`,
          backgroundSize: "cover",
        }}
      >
        <h3>{card.name}</h3>
        <h4>{card.address}</h4>
      </div>
    </Link>
  );
}
