/** @jsxImportSource theme-ui */
import { ITenancy, IUnit } from '../../../types/interfaces';
import UnitItem from '../UnitItem/UnitItem'
type Props = {
  unitList: IUnit[];
  tenancy: ITenancy;
}
export default function UnitList({unitList, tenancy}:Props) {
  // const unitList = [
  //   {
  //     id: 12345,
  //     number: 1,
  //     tenancy: {
  //       tenantOne: {
  //         firstName: 'Danielle',
  //         lastName: 'Stroscher',
  //       },
  //       tenantTwo: {
  //         firstName: 'Danielle',
  //         lastName: 'Stroscher',
  //       }
  //     }
  //   }
  // ];

  return (
    <div sx={{ variant: 'containers.unitList'}}>
      {
        unitList && unitList.map((unit:IUnit) => {
          return <UnitItem key={unit.id} unit={unit} tenancy={tenancy}/>
        })
      }
    </div>
  )
}