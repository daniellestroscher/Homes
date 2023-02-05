/** @jsxImportSource theme-ui */
import { useState } from 'react';
import { ITenancy, IUnit } from '../../../types/interfaces';
import { filterUnits } from '../../utils/helperFunctions';
import UnitItem from '../UnitItem/UnitItem'
type Props = {
  unitList: IUnit[];
  tenancyArr: ITenancy[];
}
export default function UnitList({unitList, tenancyArr }:Props) {
  // unitList.forEach((unit) => {
  //   unit.tenancies = [];
  //   let activeTenancy = tenancyArr.find((one)=> {
  //     return one.unitId == unit.unitId &&
  //     new Date(one.establishedDate).getTime() <= new Date().getTime() &&
  //     one.activeStatus == true;
  //   })
  //   let nextTenancy = tenancyArr.find((one)=> {
  //     return one.unitId === unit.unitId &&
  //     new Date(one.establishedDate).getTime() > new Date().getTime() &&
  //     one.activeStatus === false;
  //   })
  //   if (activeTenancy) {
  //     unit.tenancies.push(activeTenancy);
  //   } else if (nextTenancy) {
  //     unit.tenancies?.push(nextTenancy);
  //   }
  // })
  // const filteredUnits = filterUnits(unitList, searchQuery);
  // const [unitListWithTenancy, setUnitListWithTenancy] = useState<IUnit[]>(filteredUnits);
  // console.log(unitListWithTenancy, 'the list')


  return (
    <>
      {
        !unitList.length &&
        <p sx={{variant: 'components.message'}}>Start by adding a unit to your community!</p>
      }
      <div sx={{ variant: 'containers.unitList'}}>
        {
          unitList && unitList.map((unit:IUnit) => {
            return <UnitItem key={unit.unitId} unit={unit} tenancies={unit.tenancies}/>

          })
        }
      </div>
    </>
  )
}