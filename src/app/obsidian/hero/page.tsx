import type { Metadata } from "next";
import Link from "next/link";

import { ObsidianHeroInterface } from "@/components/designs/obsidian/obsidian-hero-interface";
import styles from "@/components/designs/obsidian/obsidian.module.css";
import { ObsidianThemeShell } from "@/components/designs/obsidian/theme-shell";

export const metadata: Metadata = {
  title: "Obsidian Hero Lab | Unica AI",
  description:
    "Изолированная страница для отладки и развития анимированного интерфейса из hero-блока Obsidian.",
};

export default function ObsidianHeroPage() {
  return (
    <ObsidianThemeShell>
      <div className={styles.page}>
        <main className={styles.main}>
          <section className={styles.heroLab}>
            <div className={styles.shell}>
              <Link href="/" className={styles.heroLabLink}>
                На главную
              </Link>

              <div className={[styles.heroLabStage, styles.heroLabStageInteractive].join(" ")}>
                <ObsidianHeroInterface interactive />
              </div>
            </div>
          </section>
        </main>
      </div>
    </ObsidianThemeShell>
  );
}
