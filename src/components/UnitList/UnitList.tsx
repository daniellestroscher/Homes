/** @jsxImportSource theme-ui */
import { ITenancy, IUnit } from '../../../types/interfaces';
import UnitItem from '../UnitItem/UnitItem'
type Props = {
  unitList: IUnit[];
  tenancy: ITenancy;
}
export default function UnitList({unitList, tenancy}:Props) {

  return (
    <>
      {
        !unitList.length &&
        <p sx={{variant: 'components.message'}}>Start by adding a unit to your community!</p>
      }
      <div sx={{ variant: 'containers.unitList'}}>
        {
          unitList && unitList.map((unit:IUnit) => {
            return <UnitItem key={unit.id} unit={unit} tenancy={tenancy}/>
          })
        }
      </div>
    </>
  )
}