/** @jsxImportSource theme-ui */
import { useState } from 'react'
import Menu from '../../../src/components/Menu/Menu'
import UnitList from '../../../src/components/UnitList/UnitList'

export default function Home() {
  const [menuToggle, setMenuToggle] = useState<boolean>(true);
  return (
    <>
      <Menu menuToggle={menuToggle} setMenuToggle={setMenuToggle}/>
      <div sx={{
        variant: 'containers.mainPageCont',
        left: '35px',
        ...(menuToggle && {
          variant: 'containers.mainPageCont',
          left: '155px'
        })
      }}>
      <UnitList/>
      </div>
    </>
  )

}