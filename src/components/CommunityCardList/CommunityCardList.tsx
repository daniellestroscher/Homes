/** @jsxImportSource theme-ui */
import { ICommunity } from '../../../types/interfaces';
import CommunityCard from '../CommunityCard/CommunityCard'

export default function CommunityCardList() {
  const CardList = [] as ICommunity[];
  return(
    <>
      {
        CardList.length !== 0 ? CardList.map((card:ICommunity) => {
          return <CommunityCard key={card.id} card={card}/>
        })
        :
        <p
          sx={{marginTop: '25px'}}
        >To get started, add a community!</p>
      }
    </>
  )
}