/** @jsxImportSource theme-ui */
import { IUnit } from '../../../types/interfaces'

interface Props{
  unit: IUnit
}
export default function RentIncreaseItem({unit}:Props) {

  return (
    <div sx={{variant: 'cards.primary'}}>
      {/* <p>{unit.tenancy?.tenantOne.firstName + ' ' + unit.tenancy?.tenantOne.lastName}</p>
      <p>{unit.tenancy?.tenantTwo?.firstName + ' ' + unit.tenancy?.tenantTwo?.lastName}</p>
      <div>No. {unit.number}</div> */}
    </div>
  )
};