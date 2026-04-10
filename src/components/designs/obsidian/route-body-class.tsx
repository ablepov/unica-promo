"use client";

import { useEffect } from "react";

const OBSIDIAN_BODY_CLASS = "obsidian-route";

export function ObsidianRouteBodyClass() {
  useEffect(() => {
    document.body.classList.add(OBSIDIAN_BODY_CLASS);

    return () => {
      document.body.classList.remove(OBSIDIAN_BODY_CLASS);
    };
  }, []);

  return null;
}
