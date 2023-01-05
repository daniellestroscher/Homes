/** @jsxImportSource theme-ui */
import { IUnit } from '../../../types/interfaces'

interface Props{
  unit: IUnit
}
export default function RentIncreaseItem({unit}:Props) {

  return (
    <div sx={{variant: 'cards.primary'}}>
      <p>{unit.tenantOne.firstName + ' ' + unit.tenantOne.lastName}</p>
      <p>{unit.tenantTwo?.firstName + ' ' + unit.tenantTwo?.lastName}</p>
      <div>No. {unit.number}</div>
    </div>
  )
};