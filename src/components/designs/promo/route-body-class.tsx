"use client";

import { useEffect } from "react";

const PROMO_BODY_CLASS = "promo-route";

export function PromoRouteBodyClass() {
  useEffect(() => {
    document.body.classList.add(PROMO_BODY_CLASS);

    return () => {
      document.body.classList.remove(PROMO_BODY_CLASS);
    };
  }, []);

  return null;
}
