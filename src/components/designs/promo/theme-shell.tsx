import { type ReactNode } from "react";

import { PromoRouteBodyClass } from "./route-body-class";

export function PromoThemeShell({ children }: { children: ReactNode }) {
  return (
    <div>
      <PromoRouteBodyClass />
      {children}
    </div>
  );
}
