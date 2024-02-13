"use client";

import StoreProvider from "./StoreProvider";
import Template from "./template";

export function Providers({children}: any) {
  return (
    <StoreProvider>
      <Template>{children}</Template>
    </StoreProvider>
  )
}