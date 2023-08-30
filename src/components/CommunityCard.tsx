/** @jsxImportSource theme-ui */

import { ICommunity } from "../../types/interfaces";

interface Props {
  card: ICommunity;
}
export default function CommunityCard({ card }: Props) {
  return (
      <a href={`/${card.id}`}>
        <div
          sx={{
            variant: "cards.communityCard",
            backgroundImage: `linear-gradient(
            rgba(218, 215, 205, 0.3),
            rgba(218, 215, 205, 0.4)
          ), url('${card.image}')`,
            backgroundSize: "cover",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            sx={{
              width: "100%",
              padding: "10px",
              backgroundColor: "transparent",
              backdropFilter: "blur(3px)",
              borderRadius: "10px",
            }}
          >
            <h1>{card.name}</h1>
            <h2>{card.address}</h2>
          </div>
        </div>
      </a>
  );
}
