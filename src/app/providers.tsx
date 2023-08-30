"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "theme-ui";
import theme from "../theme";

// import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { ModalProvider } from "../contexts/modalContext";
import { UnitListProvider } from "../contexts/unitListContext";
// import { MenuProvider } from "../src/contexts/menuContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* <CacheProvider> */}
        <ChakraProvider>
          <ThemeProvider theme={theme}>
            <ModalProvider>
              <UnitListProvider>{children}</UnitListProvider>
            </ModalProvider>
          </ThemeProvider>
        </ChakraProvider>
      {/* </CacheProvider> */}
    </SessionProvider>
  );
}
