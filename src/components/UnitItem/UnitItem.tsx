/** @jsxImportSource theme-ui */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IUnit } from '../../../types/interfaces'

interface Props{
  unit: IUnit
}
export default function UnitItem({unit}:Props) {
  const router = useRouter()
  const { id } = router.query;

  return (
    <Link href="/id/unitId" as={`/${id}/${unit.id}`}>
      <div sx={{variant: 'cards.primary'}}>
        <p>{unit.tenantOne.firstName + ' ' + unit.tenantOne.lastName}</p>
        <p>{unit.tenantTwo?.firstName + ' ' + unit.tenantTwo?.lastName}</p>
        <div>No. {unit.number}</div>
      </div>
    </Link>
  )
};