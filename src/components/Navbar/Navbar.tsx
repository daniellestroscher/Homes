/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { useColorMode } from 'theme-ui';
import Brighten from '../Brighten';
import Darken from '../Darken';
import Login from '../Login/Login'
import CommunityCardList from '../CommunityCardList/CommunityCardList';
type Props = {
  name: string | undefined;
}
function Navbar ({name}:Props) {
  const [colorMode, setColorMode] = useColorMode();
  function handleModeChange() {
    setColorMode(colorMode === 'default' ? 'dark' : 'default');
  }
  console.log(name);


  return (
    <div sx={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'fixed',
    width: '100vw',
    height: '70px',
    backgroundColor: 'background',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
    padding: '8px 20px 8px 20px',
    justifyContent: 'space-between',
    zIndex: '1',

     }}>
      <Image
      src="/logoPlain.png"
      alt="Logo"
      height={40}
      width={120}
      priority
      >
      </Image>
      <span>{name && name}</span>
      <div sx={{ display: 'flex', alignItems:'center'}}>
        <div sx={{ height: 24 }} onClick={handleModeChange}>
          {colorMode === 'default' ? <Darken /> : <Brighten />}
        </div>
        <Login/>
      </div>
    </div>
  )
}

export default Navbar;