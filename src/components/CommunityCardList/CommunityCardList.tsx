/** @jsxImportSource theme-ui */
import { ICommunity } from '../../../types/interfaces';
import CommunityCard from '../CommunityCard/CommunityCard'
type Props = {
  communityList: ICommunity[]
}
export default function CommunityCardList({communityList}: Props) {
  return(
    <div sx={{variant: 'containers.communityList'}}>
      {
        communityList.length !== 0 ? communityList.map((card:ICommunity) => {
          return <CommunityCard key={card.communityId} card={card}/>
        })
        :
        <p
          sx={{marginTop: '25px'}}
        >To get started, add a community!</p>
      }
    </div>
  )
}