/** @jsxImportSource theme-ui */
import { ITenancy, IUnit } from '../../../types/interfaces';
import UnitItem from '../UnitItem/UnitItem'
type Props = {
  unitList: IUnit[];
  //tenancies: ITenancy[];
}
export default function UnitList({unitList}:Props) {

  return (
    <>
      {
        !unitList.length &&
        <p sx={{variant: 'components.message'}}>Start by adding a unit to your community!</p>
      }
      <div sx={{ variant: 'containers.unitList'}}>
        {
          unitList && unitList.map((unit:IUnit) => {
            //let tenancy = tenancies.find((one)=>one.unitId === unit.unitId)
            return <UnitItem key={unit.unitId} unit={unit} tenancy={unit.tenancies && unit.tenancies[0]}/>

          })
        }
      </div>
    </>
  )
}