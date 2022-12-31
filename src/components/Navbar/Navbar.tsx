/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { useColorMode } from 'theme-ui';
import Brighten from '../Brighten';
import Darken from '../Darken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar () {
  const [colorMode, setColorMode] = useColorMode();
  function handleModeChange() {
    setColorMode(colorMode === 'default' ? 'dark' : 'default');
  }
  const [menuToggle, setMenuToggle] = useState<boolean>(true);

  return (
    <div sx={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'fixed',
    width: '100vw',
    backgroundColor: 'background',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
    padding: '8px 20px 8px 20px',
    justifyContent: 'space-between'
     }}>
      <Image
      src="/logoPlain.png"
      alt="Logo"
      height={40}
      width={120}
      priority
      >
      </Image>
      <span>{'park name here'}</span>
      <div sx={{ display: 'flex', gap:'10px', alignItems:'center'}}>
        <div sx={{ height: 24 }} onClick={handleModeChange}>
          {colorMode === 'default' ? <Darken /> : <Brighten />}
        </div>
        <FontAwesomeIcon icon={faUser as IconProp}
        sx={{ height: '22px', cursor: 'pointer', color: 'text'}}
        />
      </div>
    </div>
  )
}

export default Navbar;