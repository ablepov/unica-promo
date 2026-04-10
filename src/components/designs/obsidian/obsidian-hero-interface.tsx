import { ObsidianHeroMock } from "./obsidian-hero-mock";
import styles from "./obsidian.module.css";

type ObsidianHeroInterfaceProps = {
  className?: string;
  interactive?: boolean;
};

export function ObsidianHeroInterface({
  className,
  interactive = false,
}: ObsidianHeroInterfaceProps) {
  const panelClassName = [
    styles.heroPanel,
    interactive ? styles.heroPanelInteractive : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={panelClassName}>
      <div className={styles.heroShot}>
        <ObsidianHeroMock />
      </div>
    </div>
  );
}
