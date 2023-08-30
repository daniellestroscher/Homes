/** @jsxImportSource theme-ui */
import { ICommunity } from "../../types/interfaces";
import CommunityCard from "./CommunityCard";
type Props = {
  communityList: ICommunity[];
};
export default function CommunityCardList({ communityList }: Props) {
  console.log(communityList)

  return (
    <div sx={{ variant: "containers.communityList" }}>
      {communityList.length !== undefined ? (
        communityList.map((card: ICommunity, i) => {
          return <CommunityCard key={i} card={card} />;
        })
      ) : (
        <p sx={{ marginTop: "25px" }}>To get started, add a community!</p>
      )}
    </div>
  );
}
