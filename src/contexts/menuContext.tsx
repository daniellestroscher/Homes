import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type context = {
  menuToggle: boolean,
  setMenuToggle: Dispatch<SetStateAction<boolean>>
}

export const MenuContext = createContext<context>({
 menuToggle: false,
 setMenuToggle: () => {}
})

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (context) return context;
  else throw new Error('useMenuContext was used outside its provider');
}

export function MenuProvider({children}:{children: ReactNode}) {
  const [menuToggle, setMenuToggle] = useState<boolean>(true);

  return (
    <MenuContext.Provider value={{menuToggle, setMenuToggle}}>
      {children}
    </MenuContext.Provider>
  )
}