/** @jsxImportSource theme-ui */
import { IUnit } from '../../../types/interfaces';
import RentIncreaseItem from '../RentIncreaseItem/RentIncreaseItem'

export default function RentIncreaseList() {
  const unitList = [
    {
      id: 12345,
      number: 1,
      tenantOne: {
        firstName: 'Danielle',
        lastName: 'Stroscher',
      },
      tenantTwo: {
        firstName: 'Danielle',
        lastName: 'Stroscher',
      }
    },
    {
      id: 67890,
      number: 2,
      tenantOne: {
        firstName: 'Danielle',
        lastName: 'Stroscher',
      },
      tenantTwo: {
        firstName: 'Danielle',
        lastName: 'Stroscher',
      }
    },
    {
      id: 23456,
      number: 3,
      tenantOne: {
        firstName: 'Danielle',
        lastName: 'Stroscher',
      },
      tenantTwo: {
        firstName: 'Danielle',
        lastName: 'Stroscher',
      }
    },
    {
      id: 78901,
      number: 4,
      tenantOne: {
        firstName: 'Danielle',
        lastName: 'Stroscher',
      },
      tenantTwo: {
        firstName: 'Danielle',
        lastName: 'Stroscher',
      }
    },
    {
      id: 2345678,
      number: 5,
      tenantOne: {
        firstName: 'Danielle',
        lastName: 'Stroscher',
      },
      tenantTwo: {
        firstName: 'Danielle',
        lastName: 'Stroscher',
      }
    },
    {
      id: 789012,
      number: 6,
      tenantOne: {
        firstName: 'Danielle',
        lastName: 'Stroscher',
      },
      tenantTwo: {
        firstName: 'Danielle',
        lastName: 'Stroscher',
      }
    }
  ];

  return (
    <div sx={{ variant: 'containers.unitList'}}>
      {
        unitList && unitList.map((unit:IUnit) => {
          return <RentIncreaseItem key={unit.id} unit={unit}/>
        })
      }
    </div>
  )
}