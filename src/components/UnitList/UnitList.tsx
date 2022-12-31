/** @jsxImportSource theme-ui */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function UnitList() {
  let message = 'here is a card.'

  return (
    <div sx={{border: '2px solid black', height: '20px'}}>
      {message}
    </div>
  )
}
export default UnitList;