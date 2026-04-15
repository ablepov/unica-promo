"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";

import { ObsidianHeroMock } from "./obsidian-hero-mock";
import { OBSIDIAN_HERO_ARTBOARD } from "./obsidian-hero-mock.scene";
import styles from "./obsidian.module.css";

type ObsidianHeroInterfaceProps = {
  className?: string;
  interactive?: boolean;
};

function clampNumber(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

const MOBILE_PANEL_MIN_VIEWPORT_WIDTH_PX = 360;
const MOBILE_PANEL_WIDE_HEIGHT_PX = 352;
const MOBILE_PANEL_NARROW_HEIGHT_PX = 396;
const STATIC_MOBILE_LAYOUT_MAX_WIDTH_PX = 640;

function getInteractiveFrameWidth(width: number) {
  if (width < 420) {
    return 440;
  }

  if (width < 760) {
    return clampNumber(Math.round(width), 620, 760);
  }

  if (width < 1180) {
    return clampNumber(Math.round(width), 1020, 1180);
  }

  return OBSIDIAN_HERO_ARTBOARD.width;
}

function getInteractivePanelHeight(width: number) {
  if (width <= 0) {
    return null;
  }

  const frameWidth = getInteractiveFrameWidth(width);

  return Math.ceil((width * OBSIDIAN_HERO_ARTBOARD.height) / frameWidth);
}

function getStaticMobilePanelHeight(width: number) {
  if (width <= 0) {
    return null;
  }

  const clampedWidth = clampNumber(
    Math.round(width),
    MOBILE_PANEL_MIN_VIEWPORT_WIDTH_PX,
    STATIC_MOBILE_LAYOUT_MAX_WIDTH_PX,
  );
  const narrowProgress =
    (STATIC_MOBILE_LAYOUT_MAX_WIDTH_PX - clampedWidth) /
    (STATIC_MOBILE_LAYOUT_MAX_WIDTH_PX - MOBILE_PANEL_MIN_VIEWPORT_WIDTH_PX);

  return Math.round(
    MOBILE_PANEL_WIDE_HEIGHT_PX +
      (MOBILE_PANEL_NARROW_HEIGHT_PX - MOBILE_PANEL_WIDE_HEIGHT_PX) *
        narrowProgress,
  );
}

export function ObsidianHeroInterface({
  className,
  interactive = false,
}: ObsidianHeroInterfaceProps) {
  const [panelElement, setPanelElement] = useState<HTMLDivElement | null>(null);
  const [panelWidth, setPanelWidth] = useState(0);
  const handlePanelRef = useCallback((node: HTMLDivElement | null) => {
    setPanelElement(node);
  }, []);

  useEffect(() => {
    if (!panelElement) {
      return;
    }

    const updateWidth = (nextWidth: number) => {
      setPanelWidth((current) => (current === nextWidth ? current : nextWidth));
    };

    updateWidth(panelElement.clientWidth);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      updateWidth(panelElement.clientWidth);
    });

    resizeObserver.observe(panelElement);

    return () => resizeObserver.disconnect();
  }, [interactive, panelElement]);

  const panelClassName = [
    styles.heroPanel,
    interactive ? styles.heroPanelInteractive : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  const useStaticMobileLayout =
    !interactive &&
    panelWidth > 0 &&
    panelWidth <= STATIC_MOBILE_LAYOUT_MAX_WIDTH_PX;
  const forcedVariant = !interactive && !useStaticMobileLayout ? "desktop" : undefined;
  const panelHeight = interactive
    ? getInteractivePanelHeight(panelWidth)
    : useStaticMobileLayout
      ? getStaticMobilePanelHeight(panelWidth)
      : null;
  const panelStyle =
    panelHeight
      ? ({
          height: `${panelHeight}px`,
          minHeight: `${panelHeight}px`,
        } as CSSProperties)
      : undefined;
  const shotStyle = useStaticMobileLayout
    ? ({
        height: "100%",
        aspectRatio: "auto",
      } as CSSProperties)
    : undefined;

  return (
    <div ref={handlePanelRef} className={panelClassName} style={panelStyle}>
      <div className={styles.heroShot} style={shotStyle}>
        <ObsidianHeroMock
          forcedVariant={forcedVariant}
          layoutMode={
            interactive ? "cover" : useStaticMobileLayout ? "coverTop" : "contain"
          }
        />
      </div>
    </div>
  );
}
