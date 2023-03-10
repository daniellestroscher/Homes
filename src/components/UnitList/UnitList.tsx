/** @jsxImportSource theme-ui */
import { useState } from 'react';
import { ITenancy, IUnit } from '../../../types/interfaces';
import { filterUnits } from '../../utils/helperFunctions';
import UnitItem from '../UnitItem/UnitItem'
type Props = {
  unitList: IUnit[];
}
export default function UnitList({unitList }:Props) {

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