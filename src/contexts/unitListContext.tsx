import React, { Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { IUnit } from '../../types/interfaces';

type context = {
  unitList: IUnit[]
  setUnitList: Dispatch<SetStateAction<IUnit[]>>
}

export const unitListContext = React.createContext<context>({
  unitList: [{id:0, communityId:'', number:1}],
  setUnitList: ()=>[{id:0, communityId:'', number:1}]
});

export function useUnitListContext() {
  const context = useContext(unitListContext);
  if (context) return context;
  else throw new Error('useModalContext was used outside its provider');
}

export function UnitListProvider({ children }:{children:ReactNode}) {
  const [unitList, setUnitList] = useState<IUnit[]>([{
    id: 0,
    communityId: '',
    number: 0,
  }]);

  return (
    <unitListContext.Provider value={{unitList, setUnitList}}>
      {children}
    </unitListContext.Provider>
  );
};