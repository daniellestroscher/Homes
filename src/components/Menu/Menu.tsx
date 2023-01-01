/** @jsxImportSource theme-ui */
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCircleRight, faCircleLeft, faHouse, faMoneyBillTrendUp, faChartSimple, faPlus, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function Menu() {
  const [menuToggle, setMenuToggle] = useState<boolean>(true);

  return (
    <>
    <FontAwesomeIcon
      icon={ !menuToggle ? faCircleRight as IconProp : faCircleLeft as IconProp }
      onClick={() => setMenuToggle(!menuToggle)}
      sx={{
      cursor: 'pointer',
      height: '22px',
      position: 'absolute',
      top: '70px',
      left: '10px',
      zIndex: '1',
      color: 'text',
      ...(menuToggle && {
        left: '128px'
      })
    }}
    />
    <div
    sx={{
      variant: 'components.menuOpen',
      ...(!menuToggle && {
        variant: 'components.menuClose'
      })
    }}
    >
      <ul sx={{ listStyle: 'none', marginTop: '65px'}}>
        <div sx={{ variant: 'components.listItem'}}>
          <FontAwesomeIcon icon={faHouse as IconProp} />
          <li>
            <Link href=''>
            Home
            </Link>
          </li>
        </div>
        <div sx={{ variant: 'components.listItem'}}>
          <FontAwesomeIcon icon={faMoneyBillTrendUp as IconProp} />
          <li>
            <Link href=''>
            Rent Increases
            </Link>
          </li>
        </div>
        <div sx={{ variant: 'components.listItem'}}>
          <FontAwesomeIcon icon={faChartSimple as IconProp} />
          <li>
            <Link href=''>
            Rent Roll
            </Link>
          </li>
        </div>
      </ul>

      <ul sx={{ listStyle: 'none', marginTop: '375px'}}>
        <div sx={{ variant: 'components.listItem'}}>
            <FontAwesomeIcon icon={faPlus as IconProp} />
            <li>
              <Link href=''>
              Add Unit
              </Link>
            </li>
        </div>
        <div sx={{ variant: 'components.listItem'}}>
            <FontAwesomeIcon icon={faArrowRightFromBracket as IconProp} />
            <li>
              <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Logout
              </a>
            </li>
        </div>
      </ul>

    </div>
    </>
  )
}
export default Menu;